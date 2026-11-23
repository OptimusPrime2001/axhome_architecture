package module

import (
	"axhome_server/config"
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/handler"
	"axhome_server/internal/repository"
	"axhome_server/internal/service"
	"strings"

	"github.com/gin-gonic/gin"
)

type AuthModule struct {
	handler *handler.AuthHandler
}

type AuthModuleOption func(*authModuleOptions)

type authModuleOptions struct {
	jwtCfg       config.JWTConfig
	isProduction bool
}

func WithAuthConfig(cfg *config.Config) AuthModuleOption {
	return func(o *authModuleOptions) {
		if cfg != nil {
			o.jwtCfg = cfg.JWT
			o.isProduction = strings.EqualFold(cfg.AppEnv, "production")
		}
	}
}

func NewAuthModule(db sqlc.Querier, opts ...AuthModuleOption) *AuthModule {
	options := &authModuleOptions{}
	for _, opt := range opts {
		opt(options)
	}

	authRepo := repository.NewAuthRepository(db)
	authService := service.NewAuthService(authRepo, options.jwtCfg)
	authHandler := handler.NewAuthHandler(
		authService,
		handler.WithCookieConfig(options.jwtCfg.AccessTokenTTL, options.isProduction),
	)

	return &AuthModule{
		handler: authHandler,
	}
}

func (m *AuthModule) RegisterPublicRoutes(adminPublic *gin.RouterGroup) {
	publicAuth := adminPublic.Group("/auth")
	{
		publicAuth.POST("/login", m.handler.Login)
		publicAuth.POST("/logout", m.handler.Logout)
	}
}

func (m *AuthModule) RegisterPrivateRoutes(private *gin.RouterGroup) {
	privateAuth := private.Group("/auth")
	{
		privateAuth.GET("/me", m.handler.GetMe)
		privateAuth.PATCH("/profile", m.handler.UpdateProfile)
		privateAuth.PATCH("/password", m.handler.ChangePassword)
	}
}
