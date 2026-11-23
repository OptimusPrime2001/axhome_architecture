package module

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/handler"
	"axhome_server/internal/middleware"
	"axhome_server/internal/repository"
	"axhome_server/internal/service"

	"github.com/gin-gonic/gin"
)

type UserModule struct {
	handler *handler.UserHandler
}

func NewUserModule(db sqlc.Querier) *UserModule {
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	return &UserModule{
		handler: userHandler,
	}
}

func (m *UserModule) RegisterPrivateRoutes(private *gin.RouterGroup) {
	users := private.Group("/users")
	{
		// Read-only endpoints accessible to any authenticated user (including viewer/editor)
		users.GET("", m.handler.ListUsers)
		users.GET("/:id", m.handler.GetUserByID)

		// Mutation endpoints strictly restricted to admin role
		adminOnly := users.Group("")
		adminOnly.Use(middleware.RequireRoles("admin"))
		{
			adminOnly.POST("", m.handler.CreateUser)
			adminOnly.PATCH("/:id", m.handler.UpdateUser)
			adminOnly.DELETE("/:id", m.handler.DeleteUser)
		}
	}
}
