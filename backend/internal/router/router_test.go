package router_test

import (
	"axhome_server/config"
	"axhome_server/internal/middleware"
	"axhome_server/internal/module"
	"axhome_server/internal/router"
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"bytes"
	"context"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

func TestRouterEndpoints(t *testing.T) {
	gin.SetMode(gin.TestMode)
	defer os.RemoveAll("uploads")

	const testJWTSecret = "test-secret-key"

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	cfg := &config.Config{
		AppEnv: "test",
		JWT: config.JWTConfig{
			Secret:         testJWTSecret,
			AccessTokenTTL: time.Hour,
		},
		CORS: config.CORSConfig{
			AllowedOrigins: []string{"http://localhost:3000"},
		},
		BodyLimit: config.BodyLimitConfig{
			DefaultBytes: 2 << 20,
			UploadBytes:  16 << 20,
		},
	}

	storageSvc := service.NewStorageService(cfg.R2)
	rateLimiter := middleware.NewIPRateLimiter(ctx, 100, 100, time.Minute, time.Minute)
	authModule := module.NewAuthModule(nil, module.WithAuthConfig(cfg))
	projectModule := module.NewProjectModule(nil, storageSvc)
	leadModule := module.NewLeadModule(nil)
	mediaModule := module.NewMediaModule(storageSvc)

	engine := router.New(
		&router.Modules{
			Auth:    authModule,
			Project: projectModule,
			Lead:    leadModule,
			Media:   mediaModule,
		},
		&router.Deps{
			Config:      cfg,
			Logger:      zerolog.Nop(),
			RateLimiter: rateLimiter,
		},
	)

	validToken, err := utils.GenerateAccessToken(
		testJWTSecret,
		time.Hour,
		uuid.New(),
		"admin@axhome.vn",
		"admin",
	)
	if err != nil {
		t.Fatalf("failed to generate test jwt: %v", err)
	}

	tests := []struct {
		name       string
		method     string
		path       string
		body       string
		headers    map[string]string
		cookie     *http.Cookie
		wantStatus int
	}{
		{
			name:       "root health check",
			method:     http.MethodGet,
			path:       "/health",
			wantStatus: http.StatusOK,
		},
		{
			name:       "v1 health check",
			method:     http.MethodGet,
			path:       "/api/v1/health",
			wantStatus: http.StatusOK,
		},
		{
			name:       "admin auth login is publicly reachable without token (returns 400 on empty payload, not 401)",
			method:     http.MethodPost,
			path:       "/api/v1/admin/auth/login",
			body:       `{}`,
			headers:    map[string]string{"Content-Type": "application/json"},
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "admin auth logout is publicly reachable",
			method:     http.MethodPost,
			path:       "/api/v1/admin/auth/logout",
			body:       `{}`,
			headers:    map[string]string{"Content-Type": "application/json"},
			wantStatus: http.StatusOK,
		},
		{
			name:       "admin auth me without token returns 401",
			method:     http.MethodGet,
			path:       "/api/v1/admin/auth/me",
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:   "admin auth me with valid bearer token returns 200",
			method: http.MethodGet,
			path:   "/api/v1/admin/auth/me",
			headers: map[string]string{
				"Authorization": "Bearer " + validToken,
			},
			wantStatus: http.StatusOK,
		},
		{
			name:   "admin auth me with valid cookie returns 200",
			method: http.MethodGet,
			path:   "/api/v1/admin/auth/me",
			cookie: &http.Cookie{
				Name:  middleware.AccessTokenCookieName,
				Value: validToken,
			},
			wantStatus: http.StatusOK,
		},
		{
			name:       "admin projects without token returns 401",
			method:     http.MethodGet,
			path:       "/api/v1/admin/projects",
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:       "admin contacts without token returns 401",
			method:     http.MethodGet,
			path:       "/api/v1/admin/contacts",
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:       "public contacts validation rejects missing phone with 400",
			method:     http.MethodPost,
			path:       "/api/v1/public/contacts",
			body:       `{"fullName":"Nguyen Van A"}`,
			headers:    map[string]string{"Content-Type": "application/json"},
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			var reqBody *strings.Reader
			if tc.body != "" {
				reqBody = strings.NewReader(tc.body)
			} else {
				reqBody = strings.NewReader("")
			}
			req := httptest.NewRequest(tc.method, tc.path, reqBody)
			for k, v := range tc.headers {
				req.Header.Set(k, v)
			}
			if tc.cookie != nil {
				req.AddCookie(tc.cookie)
			}

			rec := httptest.NewRecorder()
			engine.ServeHTTP(rec, req)

			if rec.Code != tc.wantStatus {
				t.Fatalf("expected status %d, got %d (body: %s)", tc.wantStatus, rec.Code, rec.Body.String())
			}

			if rec.Header().Get(middleware.RequestIDHeader) == "" {
				t.Fatalf("expected %s response header to be set", middleware.RequestIDHeader)
			}

			var body map[string]any
			if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
				t.Fatalf("expected valid JSON response, got error: %v (body: %s)", err, rec.Body.String())
			}
		})
	}

	t.Run("authenticated media upload accepts valid PNG and returns url", func(t *testing.T) {
		uploadCases := []struct {
			category       string
			expectedPrefix string
		}{
			{category: "gallery", expectedPrefix: "projects/gallery/"},
			{category: "cover", expectedPrefix: "projects/cover/"},
			{category: "floor-plan", expectedPrefix: "projects/floor-plan/"},
			{category: "banner", expectedPrefix: "banner/"},
			{category: "avatar", expectedPrefix: "avatar/"},
		}

		for _, tc := range uploadCases {
			var buf bytes.Buffer
			writer := multipart.NewWriter(&buf)
			_ = writer.WriteField("category", tc.category)
			part, err := writer.CreateFormFile("file", "villa-render.png")
			if err != nil {
				t.Fatalf("failed to create form file: %v", err)
			}
			// Minimal valid PNG header signature
			pngHeader := []byte{0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D}
			_, _ = part.Write(pngHeader)
			_ = writer.Close()

			req := httptest.NewRequest(http.MethodPost, "/api/v1/admin/media/upload", &buf)
			req.Header.Set("Content-Type", writer.FormDataContentType())
			req.Header.Set("Authorization", "Bearer "+validToken)

			rec := httptest.NewRecorder()
			engine.ServeHTTP(rec, req)

			if rec.Code != http.StatusOK {
				t.Fatalf("[%s] expected 200 on media upload, got %d (body: %s)", tc.category, rec.Code, rec.Body.String())
			}

			var resp struct {
				Code int `json:"code"`
				Data struct {
					URL string `json:"url"`
					Key string `json:"key"`
				} `json:"data"`
			}
			if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
				t.Fatalf("[%s] failed to unmarshal media upload response: %v", tc.category, err)
			}
			if resp.Data.URL == "" || !strings.HasPrefix(resp.Data.Key, tc.expectedPrefix) {
				t.Fatalf("[%s] expected key prefix %q, got %+v", tc.category, tc.expectedPrefix, resp.Data)
			}

			// Delete the uploaded image via DELETE /api/v1/admin/media
			delBody, _ := json.Marshal(map[string]string{"url": resp.Data.URL})
			delReq := httptest.NewRequest(http.MethodDelete, "/api/v1/admin/media", bytes.NewReader(delBody))
			delReq.Header.Set("Content-Type", "application/json")
			delReq.Header.Set("Authorization", "Bearer "+validToken)

			delRec := httptest.NewRecorder()
			engine.ServeHTTP(delRec, delReq)

			if delRec.Code != http.StatusOK {
				t.Fatalf("[%s] expected 200 on media delete, got %d (body: %s)", tc.category, delRec.Code, delRec.Body.String())
			}
		}
	})
}
