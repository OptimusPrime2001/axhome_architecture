package middleware

import (
	"axhome_server/config"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// CORS configures explicit cross-origin rules compatible with HttpOnly cookies (AllowCredentials: true).
func CORS(cfg config.CORSConfig) gin.HandlerFunc {
	origins := cfg.AllowedOrigins
	if len(origins) == 0 {
		origins = []string{"http://localhost:3000", "http://127.0.0.1:3000"}
	}

	return cors.New(cors.Config{
		AllowOrigins: origins,
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
			"Authorization",
			RequestIDHeader,
		},
		ExposeHeaders: []string{
			"Content-Length",
			RequestIDHeader,
			"Retry-After",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})
}
