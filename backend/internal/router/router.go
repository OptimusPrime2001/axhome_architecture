package router

import (
	"axhome_server/config"
	"axhome_server/internal/middleware"
	"net/http"
	"strings"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
)

type PublicRouteRegistrar interface {
	RegisterPublicRoutes(public *gin.RouterGroup)
}

type PrivateRouteRegistrar interface {
	RegisterPrivateRoutes(private *gin.RouterGroup)
}

type RouteRegistrar interface {
	PublicRouteRegistrar
	PrivateRouteRegistrar
}

type Modules struct {
	Auth    PrivateRouteRegistrar
	User    PrivateRouteRegistrar
	Project RouteRegistrar
	Lead    RouteRegistrar
	Media   PrivateRouteRegistrar
}

type Deps struct {
	Config      *config.Config
	Logger      zerolog.Logger
	RateLimiter *middleware.IPRateLimiter
}

func New(modules *Modules, deps *Deps) *gin.Engine {
	if deps != nil && deps.Config != nil && strings.EqualFold(deps.Config.AppEnv, "production") {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()

	var (
		logger      zerolog.Logger
		corsCfg     config.CORSConfig
		bodyCfg     config.BodyLimitConfig
		rateLimiter *middleware.IPRateLimiter
		jwtSecret   string
	)
	if deps != nil {
		logger = deps.Logger
		rateLimiter = deps.RateLimiter
		if deps.Config != nil {
			corsCfg = deps.Config.CORS
			bodyCfg = deps.Config.BodyLimit
			jwtSecret = deps.Config.JWT.Secret
		}
	}

	// Production middleware chain (order matters):
	// RequestID -> StructuredLogger -> Recovery -> CORS -> RateLimiter -> Gzip -> BodySizeLimit
	r.Use(
		middleware.RequestID(),
		middleware.StructuredLogger(logger),
		middleware.Recovery(logger),
		middleware.CORS(corsCfg),
	)
	if rateLimiter != nil {
		r.Use(rateLimiter.Middleware())
	}
	r.Use(
		gzip.Gzip(gzip.DefaultCompression),
		middleware.BodySizeLimit(bodyCfg.DefaultBytes, map[string]int64{
			"/api/v1/admin/media/upload": bodyCfg.UploadBytes,
		}),
	)

	healthHandler := func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
	}

	r.GET("/health", healthHandler)
	r.Static("/uploads", "./uploads")

	api := r.Group("/api")
	registerV1(api, modules, healthHandler, jwtSecret)

	return r
}

func registerV1(api *gin.RouterGroup, modules *Modules, healthHandler gin.HandlerFunc, jwtSecret string) {
	v1 := api.Group("/v1")
	v1.GET("/health", healthHandler)

	public := v1.Group("/public")
	if modules != nil {
		if modules.Project != nil {
			modules.Project.RegisterPublicRoutes(public)
		}
		if modules.Lead != nil {
			modules.Lead.RegisterPublicRoutes(public)
		}
	}

	// Public admin auth endpoints (e.g., /api/v1/admin/auth/login, /api/v1/admin/auth/logout)
	adminPublic := v1.Group("/admin")
	if modules != nil && modules.Auth != nil {
		if pubAuth, ok := modules.Auth.(PublicRouteRegistrar); ok {
			pubAuth.RegisterPublicRoutes(adminPublic)
		}
	}

	// Protected admin endpoints requiring JWT cookie or Bearer token
	private := v1.Group("/admin")
	private.Use(middleware.Auth(jwtSecret))

	if modules != nil {
		if modules.Auth != nil {
			modules.Auth.RegisterPrivateRoutes(private)
		}
		if modules.User != nil {
			modules.User.RegisterPrivateRoutes(private)
		}
		if modules.Project != nil {
			modules.Project.RegisterPrivateRoutes(private)
		}
		if modules.Lead != nil {
			modules.Lead.RegisterPrivateRoutes(private)
		}
		if modules.Media != nil {
			modules.Media.RegisterPrivateRoutes(private)
		}
	}
}
