package module

import (
	"axhome_server/internal/db"
	"axhome_server/internal/handler"
	"axhome_server/internal/repository"
	"axhome_server/internal/service"

	"github.com/gin-gonic/gin"
)

type ProjectModule struct {
	handler *handler.ProjectHandler
}

func NewProjectModule(store db.Store, storageSvc service.StorageService) *ProjectModule {
	repo := repository.NewProjectRepository(store)
	svc := service.NewProjectService(repo, storageSvc)
	h := handler.NewProjectHandler(svc)

	return &ProjectModule{
		handler: h,
	}
}

func (m *ProjectModule) RegisterPublicRoutes(public *gin.RouterGroup) {
	projects := public.Group("/projects")
	{
		projects.GET("", m.handler.ListPublicProjects)
		projects.GET("/related/:slug", m.handler.ListRelatedProjects)
		projects.GET("/:slug", m.handler.GetPublicProjectBySlug)
	}
}

func (m *ProjectModule) RegisterPrivateRoutes(private *gin.RouterGroup) {
	projects := private.Group("/projects")
	{
		projects.GET("", m.handler.ListAdminProjects)
		projects.POST("", m.handler.CreateProject)
		projects.GET("/:id", m.handler.GetAdminProjectByID)
		projects.PUT("/:id", m.handler.UpdateProject)
		projects.PATCH("/:id", m.handler.UpdateProject)
		projects.PATCH("/:id/status", m.handler.UpdateProjectStatus)
		projects.DELETE("/:id", m.handler.DeleteProject)
	}
}
