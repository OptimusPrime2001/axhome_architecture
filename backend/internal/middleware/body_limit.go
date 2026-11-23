package middleware

import (
	"axhome_server/internal/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// BodySizeLimit enforces request payload limits using both early Content-Length checks
// and http.MaxBytesReader (protects against chunked transfer / spoofed headers).
// routeOverrides allows specific paths (e.g., media upload) to use a different byte limit.
func BodySizeLimit(defaultBytes int64, routeOverrides map[string]int64) gin.HandlerFunc {
	if defaultBytes <= 0 {
		defaultBytes = 2 << 20 // 2MB fallback
	}

	return func(c *gin.Context) {
		maxBytes := resolveBodyLimit(c.Request.URL.Path, defaultBytes, routeOverrides)

		if c.Request.ContentLength > maxBytes {
			utils.ResponseError(c, utils.NewError(utils.MsgPayloadTooLarge, utils.ErrCodePayloadTooLarge))
			return
		}

		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxBytes)
		c.Next()
	}
}

func resolveBodyLimit(path string, defaultBytes int64, overrides map[string]int64) int64 {
	if len(overrides) == 0 {
		return defaultBytes
	}
	if limit, ok := overrides[path]; ok && limit > 0 {
		return limit
	}
	for prefix, limit := range overrides {
		if limit > 0 && strings.HasPrefix(path, prefix) {
			return limit
		}
	}
	return defaultBytes
}
