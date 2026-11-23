package middleware

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
	RequestIDHeader     = "X-Request-ID"
	requestIDContextKey = "middleware.request_id"
)

// RequestID attaches a unique correlation ID to every request and response.
func RequestID() gin.HandlerFunc {
	return func(c *gin.Context) {
		reqID := strings.TrimSpace(c.GetHeader(RequestIDHeader))
		if !isValidRequestID(reqID) {
			reqID = uuid.NewString()
		}

		c.Set(requestIDContextKey, reqID)
		c.Header(RequestIDHeader, reqID)
		c.Next()
	}
}

func GetRequestID(c *gin.Context) string {
	if val, ok := c.Get(requestIDContextKey); ok {
		if reqID, ok := val.(string); ok {
			return reqID
		}
	}
	return ""
}

func isValidRequestID(id string) bool {
	if id == "" || len(id) > 64 {
		return false
	}
	for _, r := range id {
		isAlphaNum := (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r >= '0' && r <= '9')
		if !isAlphaNum && r != '-' && r != '_' {
			return false
		}
	}
	return true
}
