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
	"github.com/rs/zerolog/log"
)

type StorageService interface {
	UploadImage(ctx context.Context, fileHeader *multipart.FileHeader, category string, serverBaseURL string) (*dto.UploadMediaResponse, error)
	DeleteImageByURL(ctx context.Context, imageURL string) (string, error)
	DeleteImagesByURLs(ctx context.Context, imageURLs []string)
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

var managedMediaPrefixes = []string{
	"projects/",
	"banner/",
	"avatar/",
	"general/",
	"axhome/", // legacy prefix kept for backward-compatible deletion of previously uploaded objects
}

// resolveMediaFolder maps an upload category to its Cloudflare R2 folder prefix
// inside the configured bucket (e.g. axhome-media/projects/cover, axhome-media/banner).
func resolveMediaFolder(cleanCategory string) string {
	switch cleanCategory {
	case "cover", "project-cover":
		return "projects/cover"
	case "gallery", "project-gallery":
		return "projects/gallery"
	case "floor-plan", "floorplan":
		return "projects/floor-plan"
	case "milestone", "project-milestone":
		return "projects/milestone"
	case "project", "projects":
		return "projects"
	case "banner", "banners":
		return "banner"
	case "avatar", "avatars":
		return "avatar"
	default:
		return "general"
	}
}

func isManagedMediaKey(key string) bool {
	if key == "" || strings.Contains(key, "..") {
		return false
	}
	for _, prefix := range managedMediaPrefixes {
		if strings.HasPrefix(key, prefix) {
			return true
		}
	}
	return false
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

	folder := resolveMediaFolder(cleanCategory)

	objectKey := fmt.Sprintf(
		"%s/%d-%s-%s%s",
		folder,
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

// DeleteImageByURL deletes a single managed media object (by URL or direct object key)
// from Cloudflare R2 (or local ./uploads in dev mode). External URLs are safely ignored.
func (s *storageService) DeleteImageByURL(ctx context.Context, rawURLOrKey string) (string, error) {
	objectKey, ok := s.extractObjectKey(rawURLOrKey)
	if !ok {
		return "", nil
	}

	if s.r2Cfg.IsConfigured() {
		if err := s.deleteObjectFromR2(ctx, objectKey); err != nil {
			return "", err
		}
		return objectKey, nil
	}

	localPath := filepath.Join("uploads", filepath.FromSlash(objectKey))
	if err := os.Remove(localPath); err != nil && !os.IsNotExist(err) {
		return "", utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}
	return objectKey, nil
}

// DeleteImagesByURLs performs best-effort cleanup of multiple managed media URLs.
// Errors are logged without failing the parent DB operation.
func (s *storageService) DeleteImagesByURLs(ctx context.Context, imageURLs []string) {
	seen := make(map[string]struct{}, len(imageURLs))
	for _, raw := range imageURLs {
		trimmed := strings.TrimSpace(raw)
		if trimmed == "" {
			continue
		}
		if _, exists := seen[trimmed]; exists {
			continue
		}
		seen[trimmed] = struct{}{}

		if _, err := s.DeleteImageByURL(ctx, trimmed); err != nil {
			log.Warn().Err(err).Str("media_url", trimmed).Msg("Failed to delete orphan media object")
		}
	}
}

func (s *storageService) extractObjectKey(rawURLOrKey string) (string, bool) {
	trimmed := strings.TrimSpace(rawURLOrKey)
	if trimmed == "" {
		return "", false
	}

	// Direct managed key (e.g., "projects/gallery/12345-abc-img.webp", "banner/...", or legacy "axhome/...")
	directKey := strings.TrimLeft(trimmed, "/")
	if isManagedMediaKey(directKey) {
		return directKey, true
	}

	parsed, err := url.Parse(trimmed)
	if err != nil {
		return "", false
	}

	// Local dev uploads path: http://.../uploads/<managed-key>
	if idx := strings.Index(parsed.Path, "/uploads/"); idx >= 0 {
		key := strings.TrimLeft(parsed.Path[idx+len("/uploads/"):], "/")
		if isManagedMediaKey(key) {
			return key, true
		}
	}

	// Cloudflare R2 public URL prefix
	if publicBase := strings.TrimRight(s.r2Cfg.PublicBaseURL, "/"); publicBase != "" {
		if strings.HasPrefix(trimmed, publicBase+"/") {
			key := strings.TrimLeft(strings.TrimPrefix(trimmed, publicBase+"/"), "/")
			if isManagedMediaKey(key) {
				return key, true
			}
		}
	}

	// Cloudflare R2 endpoint/bucket URL prefix
	if endpoint := strings.TrimRight(s.r2Cfg.ResolvedEndpoint(), "/"); endpoint != "" && s.r2Cfg.BucketName != "" {
		bucketBase := fmt.Sprintf("%s/%s", endpoint, strings.Trim(s.r2Cfg.BucketName, "/"))
		if strings.HasPrefix(trimmed, bucketBase+"/") {
			key := strings.TrimLeft(strings.TrimPrefix(trimmed, bucketBase+"/"), "/")
			if isManagedMediaKey(key) {
				return key, true
			}
		}
	}

	return "", false
}

// deleteObjectFromR2 deletes an object from Cloudflare R2 using S3-compatible AWS Signature V4.
func (s *storageService) deleteObjectFromR2(ctx context.Context, objectKey string) error {
	endpoint := s.r2Cfg.ResolvedEndpoint()
	parsedEndpoint, err := url.Parse(endpoint)
	if err != nil || parsedEndpoint.Host == "" {
		return utils.NewError(utils.MsgStorageNotConfigured, utils.ErrCodeInternal)
	}

	canonicalURI := fmt.Sprintf("/%s/%s", strings.Trim(s.r2Cfg.BucketName, "/"), strings.TrimLeft(objectKey, "/"))
	targetURL := fmt.Sprintf("%s%s", strings.TrimRight(endpoint, "/"), canonicalURI)

	now := time.Now().UTC()
	amzDate := now.Format("20060102T150405Z")
	dateStamp := now.Format("20060102")
	region := "auto"
	serviceName := "s3"

	emptyHashBytes := sha256.Sum256(nil)
	payloadHash := hex.EncodeToString(emptyHashBytes[:])

	host := parsedEndpoint.Host
	canonicalHeaders := fmt.Sprintf(
		"host:%s\nx-amz-content-sha256:%s\nx-amz-date:%s\n",
		host,
		payloadHash,
		amzDate,
	)
	signedHeaders := "host;x-amz-content-sha256;x-amz-date"

	canonicalRequest := strings.Join([]string{
		http.MethodDelete,
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

	req, err := http.NewRequestWithContext(ctx, http.MethodDelete, targetURL, nil)
	if err != nil {
		return utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	req.Header.Set("x-amz-content-sha256", payloadHash)
	req.Header.Set("x-amz-date", amzDate)
	req.Header.Set("Authorization", authHeader)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return utils.WrapAppError(err, "Không thể xóa tệp trên Cloudflare R2", utils.ErrCodeInternal)
	}
	defer resp.Body.Close()

	// R2/S3 returns 204 No Content (or 200 OK); 404 is treated as already deleted (idempotent)
	if resp.StatusCode == http.StatusNotFound || (resp.StatusCode >= 200 && resp.StatusCode < 300) {
		return nil
	}

	bodyBytes, _ := io.ReadAll(io.LimitReader(resp.Body, 2048))
	return utils.WrapAppError(
		fmt.Errorf("r2 delete status %d: %s", resp.StatusCode, string(bodyBytes)),
		"Cloudflare R2 từ chối yêu cầu xóa tệp",
		utils.ErrCodeInternal,
	)
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
