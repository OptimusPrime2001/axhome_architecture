package middleware

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mattn/go-colorable"
	"github.com/rs/zerolog"
)

// NewLogger creates a structured zerolog.Logger.
// In development, logs are formatted with ANSI colors for readability.
// In production, logs are emitted as structured JSON for log aggregators.
func NewLogger(appEnv string) zerolog.Logger {
	zerolog.TimeFieldFormat = time.RFC3339

	if strings.EqualFold(appEnv, "production") {
		return zerolog.New(os.Stdout).
			Level(zerolog.InfoLevel).
			With().
			Timestamp().
			Logger()
	}

	consoleWriter := zerolog.ConsoleWriter{
		Out:        colorable.NewColorableStdout(),
		TimeFormat: "15:04:05",
		NoColor:    false,
		FormatLevel: func(i any) string {
			level := strings.ToUpper(fmt.Sprintf("%s", i))
			switch level {
			case "DEBUG":
				return "\x1b[36m[DBG]\x1b[0m"
			case "INFO":
				return "\x1b[32m[INF]\x1b[0m"
			case "WARN":
				return "\x1b[33m[WRN]\x1b[0m"
			case "ERROR":
				return "\x1b[31m[ERR]\x1b[0m"
			case "FATAL":
				return "\x1b[35m[FTL]\x1b[0m"
			default:
				return fmt.Sprintf("[%s]", level)
			}
		},
		FormatFieldName: func(i any) string {
			return fmt.Sprintf("\x1b[90m%s=\x1b[0m", i)
		},
	}

	return zerolog.New(consoleWriter).
		Level(zerolog.DebugLevel).
		With().
		Timestamp().
		Logger()
}

// StructuredLogger logs HTTP request metadata using zerolog.
func StructuredLogger(logger zerolog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		rawQuery := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		status := c.Writer.Status()
		bytesOut := c.Writer.Size()
		if bytesOut < 0 {
			bytesOut = 0
		}

		var event *zerolog.Event
		switch {
		case status >= 500:
			event = logger.Error()
		case status >= 400:
			event = logger.Warn()
		default:
			event = logger.Info()
		}

		event.
			Str("request_id", GetRequestID(c)).
			Str("method", c.Request.Method).
			Str("path", path).
			Int("status", status).
			Dur("latency", latency).
			Str("ip", c.ClientIP()).
			Int("bytes", bytesOut).
			Str("user_agent", c.Request.UserAgent())

		if rawQuery != "" {
			event.Str("query", rawQuery)
		}

		if claims, ok := GetAuthClaims(c); ok {
			event.Str("user_id", claims.UserID.String())
		}

		if len(c.Errors) > 0 {
			event.Str("errors", c.Errors.String())
		}

		event.Msg("http request")
	}
}
