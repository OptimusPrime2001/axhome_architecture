package module

import (
	"axhome_server/config"
	"axhome_server/internal/handler"
	"axhome_server/internal/service"

	"github.com/gin-gonic/gin"
)

type MediaModule struct {
	handler *handler.MediaHandler
}

func NewMediaModule(r2Cfg config.R2Config) *MediaModule {
	storageSvc := service.NewStorageService(r2Cfg)
	h := handler.NewMediaHandler(storageSvc)

	return &MediaModule{
		handler: h,
	}
}

func (m *MediaModule) RegisterPrivateRoutes(private *gin.RouterGroup) {
	media := private.Group("/media")
	{
		media.POST("/upload", m.handler.Upload)
	}
}
