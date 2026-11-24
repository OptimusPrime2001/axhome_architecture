package handler

import (
	"axhome_server/internal/dto"
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"fmt"
	"net/http"
	"strings"

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

func (h *MediaHandler) Delete(ctx *gin.Context) {
	var req dto.DeleteMediaRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Thiếu đường dẫn ảnh cần xóa", utils.ErrCodeBadRequest))
		return
	}

	target := strings.TrimSpace(req.Key)
	if target == "" {
		target = strings.TrimSpace(req.URL)
	}
	if target == "" {
		utils.ResponseError(ctx, utils.NewError("Thiếu đường dẫn ảnh cần xóa", utils.ErrCodeBadRequest))
		return
	}

	deletedKey, err := h.storage.DeleteImageByURL(ctx.Request.Context(), target)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, dto.DeleteMediaResponse{
		Deleted: deletedKey != "",
		Key:     deletedKey,
	})
}
