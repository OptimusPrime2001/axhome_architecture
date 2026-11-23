package utils

import (
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestResponseErrorStatusMapping(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name       string
		err        error
		wantStatus int
	}{
		{
			name:       "not found error",
			err:        NewError(MsgUserNotFound, ErrCodeNotFound),
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "unauthorized error",
			err:        NewError(MsgInvalidCredentials, ErrCodeUnauthorized),
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:       "forbidden error",
			err:        NewError(MsgForbidden, ErrCodeForbidden),
			wantStatus: http.StatusForbidden,
		},
		{
			name:       "conflict error wrapped",
			err:        fmt.Errorf("auth service: %w", NewError(MsgEmailAlreadyExists, ErrCodeConflict)),
			wantStatus: http.StatusConflict,
		},
		{
			name:       "rate limit error",
			err:        NewError(MsgTooManyRequests, ErrCodeTooManyRequests),
			wantStatus: http.StatusTooManyRequests,
		},
		{
			name:       "max bytes error maps to 413",
			err:        &http.MaxBytesError{Limit: 1024},
			wantStatus: http.StatusRequestEntityTooLarge,
		},
		{
			name:       "unknown error falls back to 500",
			err:        errors.New("raw sql failure"),
			wantStatus: http.StatusInternalServerError,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			ctx, _ := gin.CreateTestContext(rec)

			ResponseError(ctx, tc.err)

			if rec.Code != tc.wantStatus {
				t.Fatalf("expected status %d, got %d (body: %s)", tc.wantStatus, rec.Code, rec.Body.String())
			}
		})
	}
}

func TestSlugifyVietnamese(t *testing.T) {
	cases := []struct {
		input string
		want  string
	}{
		{
			input: "Biệt Thự Tân Cổ Điển Thảo Điền",
			want:  "biet-thu-tan-co-dien-thao-dien",
		},
		{
			input: "  Dinh Thự Indochine — Quận 2 (2026)  ",
			want:  "dinh-thu-indochine-quan-2-2026",
		},
	}

	for _, tc := range cases {
		if got := Slugify(tc.input); got != tc.want {
			t.Fatalf("Slugify(%q) = %q, want %q", tc.input, got, tc.want)
		}
	}
}
