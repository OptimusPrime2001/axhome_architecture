package service

import (
	"axhome_server/config"
	"axhome_server/internal/dto"
	"axhome_server/internal/utils"
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
)

type StorageService interface {
	UploadImage(ctx context.Context, fileHeader *multipart.FileHeader, category string, serverBaseURL string) (*dto.UploadMediaResponse, error)
}

type storageService struct {
	r2Cfg      config.R2Config
	httpClient *http.Client
}

func NewStorageService(r2Cfg config.R2Config) StorageService {
	return &storageService{
		r2Cfg: r2Cfg,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

var allowedImageMimeTypes = map[string]string{
	"image/jpeg": ".jpg",
	"image/png":  ".png",
	"image/webp": ".webp",
	"image/avif": ".avif",
}

func (s *storageService) UploadImage(
	ctx context.Context,
	fileHeader *multipart.FileHeader,
	category string,
	serverBaseURL string,
) (*dto.UploadMediaResponse, error) {
	if fileHeader == nil || fileHeader.Size <= 0 {
		return nil, utils.NewError(utils.MsgInvalidMediaFile, utils.ErrCodeBadRequest)
	}

	src, err := fileHeader.Open()
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInvalidMediaFile, utils.ErrCodeBadRequest)
	}
	defer src.Close()

	fileBytes, err := io.ReadAll(src)
	if err != nil || len(fileBytes) == 0 {
		return nil, utils.NewError(utils.MsgInvalidMediaFile, utils.ErrCodeBadRequest)
	}

	detectedMime := http.DetectContentType(fileBytes)
	ext, ok := allowedImageMimeTypes[detectedMime]
	if !ok {
		headerMime := strings.ToLower(strings.TrimSpace(fileHeader.Header.Get("Content-Type")))
		ext, ok = allowedImageMimeTypes[headerMime]
		if !ok {
			return nil, utils.NewError(utils.MsgInvalidMediaFile, utils.ErrCodeBadRequest)
		}
		detectedMime = headerMime
	}

	cleanCategory := utils.Slugify(category)
	if cleanCategory == "" {
		cleanCategory = "general"
	}

	baseName := strings.TrimSuffix(fileHeader.Filename, filepath.Ext(fileHeader.Filename))
	cleanBase := utils.Slugify(baseName)
	if cleanBase == "" {
		cleanBase = "image"
	}

	objectKey := fmt.Sprintf(
		"axhome/%s/%d-%s-%s%s",
		cleanCategory,
		time.Now().UTC().Unix(),
		uuid.New().String()[:8],
		cleanBase,
		ext,
	)

	// 1. If Cloudflare R2 is configured, upload directly to Cloudflare R2 via AWS S3 SigV4 PutObject
	if s.r2Cfg.IsConfigured() {
		publicURL, err := s.putObjectToR2(ctx, objectKey, fileBytes, detectedMime)
		if err != nil {
			return nil, err
		}
		return &dto.UploadMediaResponse{
			URL:      publicURL,
			Key:      objectKey,
			FileName: fileHeader.Filename,
			Size:     int64(len(fileBytes)),
			MimeType: detectedMime,
			Category: cleanCategory,
		}, nil
	}

	// 2. Local development fallback: persist into ./uploads/<objectKey> and serve via /uploads
	localPath := filepath.Join("uploads", filepath.FromSlash(objectKey))
	if err := os.MkdirAll(filepath.Dir(localPath), 0o755); err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}
	if err := os.WriteFile(localPath, fileBytes, 0o644); err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	baseURL := strings.TrimRight(serverBaseURL, "/")
	if baseURL == "" {
		baseURL = "http://localhost:8080"
	}

	return &dto.UploadMediaResponse{
		URL:      fmt.Sprintf("%s/uploads/%s", baseURL, objectKey),
		Key:      objectKey,
		FileName: fileHeader.Filename,
		Size:     int64(len(fileBytes)),
		MimeType: detectedMime,
		Category: cleanCategory,
	}, nil
}

// putObjectToR2 uploads an object to Cloudflare R2 using S3-compatible AWS Signature V4.
func (s *storageService) putObjectToR2(ctx context.Context, objectKey string, payload []byte, contentType string) (string, error) {
	endpoint := s.r2Cfg.ResolvedEndpoint()
	parsedEndpoint, err := url.Parse(endpoint)
	if err != nil || parsedEndpoint.Host == "" {
		return "", utils.NewError(utils.MsgStorageNotConfigured, utils.ErrCodeInternal)
	}

	canonicalURI := fmt.Sprintf("/%s/%s", strings.Trim(s.r2Cfg.BucketName, "/"), strings.TrimLeft(objectKey, "/"))
	targetURL := fmt.Sprintf("%s%s", strings.TrimRight(endpoint, "/"), canonicalURI)

	now := time.Now().UTC()
	amzDate := now.Format("20060102T150405Z")
	dateStamp := now.Format("20060102")
	region := "auto"
	serviceName := "s3"

	payloadHashBytes := sha256.Sum256(payload)
	payloadHash := hex.EncodeToString(payloadHashBytes[:])

	host := parsedEndpoint.Host
	canonicalHeaders := fmt.Sprintf(
		"content-type:%s\nhost:%s\nx-amz-content-sha256:%s\nx-amz-date:%s\n",
		contentType,
		host,
		payloadHash,
		amzDate,
	)
	signedHeaders := "content-type;host;x-amz-content-sha256;x-amz-date"

	canonicalRequest := strings.Join([]string{
		http.MethodPut,
		canonicalURI,
		"",
		canonicalHeaders,
		signedHeaders,
		payloadHash,
	}, "\n")

	canonicalReqHash := sha256.Sum256([]byte(canonicalRequest))
	credentialScope := fmt.Sprintf("%s/%s/%s/aws4_request", dateStamp, region, serviceName)
	stringToSign := strings.Join([]string{
		"AWS4-HMAC-SHA256",
		amzDate,
		credentialScope,
		hex.EncodeToString(canonicalReqHash[:]),
	}, "\n")

	signingKey := deriveSigV4Key(s.r2Cfg.SecretAccessKey, dateStamp, region, serviceName)
	signature := hex.EncodeToString(hmacSHA256(signingKey, []byte(stringToSign)))

	authHeader := fmt.Sprintf(
		"AWS4-HMAC-SHA256 Credential=%s/%s, SignedHeaders=%s, Signature=%s",
		s.r2Cfg.AccessKeyID,
		credentialScope,
		signedHeaders,
		signature,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodPut, targetURL, bytes.NewReader(payload))
	if err != nil {
		return "", utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	req.Header.Set("Content-Type", contentType)
	req.Header.Set("Cache-Control", "public, max-age=31536000, immutable")
	req.Header.Set("x-amz-content-sha256", payloadHash)
	req.Header.Set("x-amz-date", amzDate)
	req.Header.Set("Authorization", authHeader)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", utils.WrapAppError(err, "Không thể tải tệp lên Cloudflare R2", utils.ErrCodeInternal)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		bodyBytes, _ := io.ReadAll(io.LimitReader(resp.Body, 2048))
		return "", utils.WrapAppError(
			fmt.Errorf("r2 status %d: %s", resp.StatusCode, string(bodyBytes)),
			"Cloudflare R2 từ chối yêu cầu tải tệp lên",
			utils.ErrCodeInternal,
		)
	}

	publicBase := strings.TrimRight(s.r2Cfg.PublicBaseURL, "/")
	if publicBase == "" {
		publicBase = fmt.Sprintf("%s/%s", strings.TrimRight(endpoint, "/"), s.r2Cfg.BucketName)
	}
	return fmt.Sprintf("%s/%s", publicBase, strings.TrimLeft(objectKey, "/")), nil
}

func hmacSHA256(key, data []byte) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write(data)
	return mac.Sum(nil)
}

func deriveSigV4Key(secret, dateStamp, region, service string) []byte {
	kDate := hmacSHA256([]byte("AWS4"+secret), []byte(dateStamp))
	kRegion := hmacSHA256(kDate, []byte(region))
	kService := hmacSHA256(kRegion, []byte(service))
	return hmacSHA256(kService, []byte("aws4_request"))
}
