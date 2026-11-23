package middleware_test

import (
	"axhome_server/config"
	"axhome_server/internal/middleware"
	"axhome_server/internal/utils"
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

func TestRequestIDMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.New()
	r.Use(middleware.RequestID())
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, middleware.GetRequestID(c))
	})

	t.Run("generates request id when missing", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/ping", nil)
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		headerID := rec.Header().Get(middleware.RequestIDHeader)
		if headerID == "" {
			t.Fatal("expected generated X-Request-ID header")
		}
		if rec.Body.String() != headerID {
			t.Fatalf("expected context id %q to match header %q", rec.Body.String(), headerID)
		}
	})

	t.Run("preserves valid client request id", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/ping", nil)
		req.Header.Set(middleware.RequestIDHeader, "client-trace-123")
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		if got := rec.Header().Get(middleware.RequestIDHeader); got != "client-trace-123" {
			t.Fatalf("expected preserved request id, got %q", got)
		}
	})
}

func TestStructuredLoggerAndRecovery(t *testing.T) {
	gin.SetMode(gin.TestMode)

	var logBuf bytes.Buffer
	logger := zerolog.New(&logBuf)

	r := gin.New()
	r.Use(
		middleware.RequestID(),
		middleware.StructuredLogger(logger),
		middleware.Recovery(logger),
	)
	r.GET("/panic", func(c *gin.Context) {
		panic("boom")
	})

	req := httptest.NewRequest(http.MethodGet, "/panic", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusInternalServerError {
		t.Fatalf("expected 500 on panic, got %d", rec.Code)
	}

	logOutput := logBuf.String()
	if !strings.Contains(logOutput, "panic recovered") || !strings.Contains(logOutput, "http request") {
		t.Fatalf("expected structured panic and http request logs, got: %s", logOutput)
	}
}

func TestCORSMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.New()
	r.Use(middleware.CORS(config.CORSConfig{
		AllowedOrigins: []string{"http://localhost:3000"},
	}))
	r.GET("/data", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	t.Run("allows configured origin with credentials", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodOptions, "/data", nil)
		req.Header.Set("Origin", "http://localhost:3000")
		req.Header.Set("Access-Control-Request-Method", "GET")
		rec := httptest.NewRecorder()

		r.ServeHTTP(rec, req)

		if rec.Code != http.StatusNoContent {
			t.Fatalf("expected 204 preflight, got %d", rec.Code)
		}
		if got := rec.Header().Get("Access-Control-Allow-Origin"); got != "http://localhost:3000" {
			t.Fatalf("expected allowed origin header, got %q", got)
		}
		if got := rec.Header().Get("Access-Control-Allow-Credentials"); got != "true" {
			t.Fatalf("expected Allow-Credentials=true, got %q", got)
		}
	})

	t.Run("does not grant unknown origin", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/data", nil)
		req.Header.Set("Origin", "https://evil.example.com")
		rec := httptest.NewRecorder()

		r.ServeHTTP(rec, req)

		if got := rec.Header().Get("Access-Control-Allow-Origin"); got != "" {
			t.Fatalf("expected no Allow-Origin for unknown origin, got %q", got)
		}
	})
}

func TestRateLimitMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	limiter := middleware.NewIPRateLimiter(ctx, 1, 2, time.Minute, time.Minute)

	r := gin.New()
	r.Use(limiter.Middleware())
	r.GET("/limited", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	for i := 0; i < 2; i++ {
		req := httptest.NewRequest(http.MethodGet, "/limited", nil)
		req.RemoteAddr = "198.51.100.10:12345"
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)
		if rec.Code != http.StatusOK {
			t.Fatalf("request %d within burst expected 200, got %d", i+1, rec.Code)
		}
	}

	// 3rd immediate request exceeds burst=2 -> must return 429
	req := httptest.NewRequest(http.MethodGet, "/limited", nil)
	req.RemoteAddr = "198.51.100.10:12345"
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusTooManyRequests {
		t.Fatalf("expected 429 Too Many Requests, got %d", rec.Code)
	}
	if rec.Header().Get("Retry-After") == "" {
		t.Fatal("expected Retry-After header on 429 response")
	}
}

func TestBodySizeLimitMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.New()
	r.Use(middleware.BodySizeLimit(16, map[string]int64{
		"/upload": 64,
	}))

	readHandler := func(c *gin.Context) {
		_, err := io.ReadAll(c.Request.Body)
		if err != nil {
			utils.ResponseError(c, err)
			return
		}
		c.Status(http.StatusOK)
	}
	r.POST("/json", readHandler)
	r.POST("/upload", readHandler)

	t.Run("allows payload within default limit", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/json", strings.NewReader("12345"))
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
	})

	t.Run("rejects payload over default Content-Length", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/json", strings.NewReader(strings.Repeat("a", 32)))
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		if rec.Code != http.StatusRequestEntityTooLarge {
			t.Fatalf("expected 413, got %d", rec.Code)
		}
	})

	t.Run("rejects chunked payload without Content-Length over limit", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/json", strings.NewReader(strings.Repeat("b", 32)))
		req.ContentLength = -1 // simulate chunked transfer encoding
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		if rec.Code != http.StatusRequestEntityTooLarge {
			t.Fatalf("expected 413 on chunked stream, got %d (body: %s)", rec.Code, rec.Body.String())
		}
	})

	t.Run("allows larger payload on overridden upload route", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/upload", strings.NewReader(strings.Repeat("c", 32)))
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200 on upload route override, got %d", rec.Code)
		}
	})
}

func TestAuthAndRequireRolesMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)

	const secret = "super-secret-jwt-key"
	userID := uuid.New()

	adminToken, err := utils.GenerateAccessToken(secret, time.Hour, userID, "admin@axhome.vn", "admin")
	if err != nil {
		t.Fatalf("failed to generate admin token: %v", err)
	}
	viewerToken, err := utils.GenerateAccessToken(secret, time.Hour, userID, "viewer@axhome.vn", "viewer")
	if err != nil {
		t.Fatalf("failed to generate viewer token: %v", err)
	}
	expiredToken, err := utils.GenerateAccessToken(secret, -time.Minute, userID, "admin@axhome.vn", "admin")
	if err != nil {
		t.Fatalf("failed to generate expired token: %v", err)
	}

	r := gin.New()
	protected := r.Group("/admin")
	protected.Use(middleware.Auth(secret))
	protected.GET("/me", func(c *gin.Context) {
		claims, ok := middleware.GetAuthClaims(c)
		if !ok {
			c.Status(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, gin.H{"user_id": claims.UserID.String(), "role": claims.Role})
	})
	protected.DELETE("/users", middleware.RequireRoles("admin"), func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	t.Run("missing token returns 401", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/admin/me", nil)
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("expected 401, got %d", rec.Code)
		}
	})

	t.Run("expired token returns 401", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/admin/me", nil)
		req.Header.Set("Authorization", "Bearer "+expiredToken)
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)
		if rec.Code != http.StatusUnauthorized {
			t.Fatalf("expected 401 for expired token, got %d", rec.Code)
		}
	})

	t.Run("valid cookie authenticates and populates claims", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/admin/me", nil)
		req.AddCookie(&http.Cookie{Name: middleware.AccessTokenCookieName, Value: adminToken})
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)

		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
		var payload map[string]string
		if err := json.Unmarshal(rec.Body.Bytes(), &payload); err != nil {
			t.Fatalf("invalid json: %v", err)
		}
		if payload["user_id"] != userID.String() || payload["role"] != "admin" {
			t.Fatalf("unexpected claims payload: %+v", payload)
		}
	})

	t.Run("RequireRoles blocks viewer with 403", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodDelete, "/admin/users", nil)
		req.Header.Set("Authorization", "Bearer "+viewerToken)
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)
		if rec.Code != http.StatusForbidden {
			t.Fatalf("expected 403, got %d", rec.Code)
		}
	})

	t.Run("RequireRoles allows admin with 200", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodDelete, "/admin/users", nil)
		req.Header.Set("Authorization", "Bearer "+adminToken)
		rec := httptest.NewRecorder()
		r.ServeHTTP(rec, req)
		if rec.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", rec.Code)
		}
	})
}
