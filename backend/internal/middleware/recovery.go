package middleware

import (
	"axhome_server/internal/utils"
	"runtime/debug"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
)

// Recovery catches panics, logs stack traces with request context, and returns a safe 500 JSON response.
func Recovery(logger zerolog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if rec := recover(); rec != nil {
				logger.Error().
					Str("request_id", GetRequestID(c)).
					Str("method", c.Request.Method).
					Str("path", c.Request.URL.Path).
					Str("ip", c.ClientIP()).
					Interface("panic", rec).
					Str("stack", string(debug.Stack())).
					Msg("panic recovered")

				utils.ResponseError(c, utils.NewError(utils.MsgInternalServer, utils.ErrCodeInternal))
			}
		}()

		c.Next()
	}
}
