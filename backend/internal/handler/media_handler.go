package handler

import (
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MediaHandler struct {
	storage service.StorageService
}

func NewMediaHandler(storage service.StorageService) *MediaHandler {
	return &MediaHandler{
		storage: storage,
	}
}

func (h *MediaHandler) Upload(ctx *gin.Context) {
	fileHeader, err := ctx.FormFile("file")
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	category := ctx.DefaultPostForm("category", "general")

	scheme := "http"
	if ctx.Request.TLS != nil || ctx.GetHeader("X-Forwarded-Proto") == "https" {
		scheme = "https"
	}
	serverBaseURL := fmt.Sprintf("%s://%s", scheme, ctx.Request.Host)

	res, err := h.storage.UploadImage(ctx.Request.Context(), fileHeader, category, serverBaseURL)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}
