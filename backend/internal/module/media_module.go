package module

import (
	"axhome_server/internal/handler"
	"axhome_server/internal/service"

	"github.com/gin-gonic/gin"
)

type MediaModule struct {
	handler *handler.MediaHandler
}

func NewMediaModule(storageSvc service.StorageService) *MediaModule {
	h := handler.NewMediaHandler(storageSvc)

	return &MediaModule{
		handler: h,
	}
}

func (m *MediaModule) RegisterPrivateRoutes(private *gin.RouterGroup) {
	media := private.Group("/media")
	{
		media.POST("/upload", m.handler.Upload)
		media.DELETE("", m.handler.Delete)
	}
}
