package handler

import (
	"axhome_server/internal/dto"
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ProjectHandler struct {
	service service.ProjectService
}

func NewProjectHandler(svc service.ProjectService) *ProjectHandler {
	return &ProjectHandler{
		service: svc,
	}
}

func (h *ProjectHandler) ListPublicProjects(ctx *gin.Context) {
	var query dto.ProjectListQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		utils.ResponseError(ctx, utils.NewError("Tham số lọc dự án không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.ListPublicProjects(ctx.Request.Context(), query)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) GetPublicProjectBySlug(ctx *gin.Context) {
	slug := ctx.Param("slug")
	res, err := h.service.GetPublicProjectBySlug(ctx.Request.Context(), slug)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) ListRelatedProjects(ctx *gin.Context) {
	slug := ctx.Param("slug")
	limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "3"))

	res, err := h.service.ListRelatedProjects(ctx.Request.Context(), slug, limit)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) ListAdminProjects(ctx *gin.Context) {
	var query dto.ProjectListQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		utils.ResponseError(ctx, utils.NewError("Tham số lọc dự án không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.ListAdminProjects(ctx.Request.Context(), query)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) GetAdminProjectByID(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã dự án (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.GetAdminProjectByID(ctx.Request.Context(), id)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) CreateProject(ctx *gin.Context) {
	var req dto.SaveProjectRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Dữ liệu dự án chưa đầy đủ hoặc không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.CreateProject(ctx.Request.Context(), req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusCreated, res)
}

func (h *ProjectHandler) UpdateProject(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã dự án (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	var req dto.SaveProjectRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Dữ liệu cập nhật dự án không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.UpdateProject(ctx.Request.Context(), id, req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) UpdateProjectStatus(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã dự án (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	var req dto.UpdateProjectStatusRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Trạng thái dự án chỉ nhận 'draft' hoặc 'published'", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.UpdateProjectStatus(ctx.Request.Context(), id, req.Status)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *ProjectHandler) DeleteProject(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã dự án (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	if err := h.service.DeleteProject(ctx.Request.Context(), id); err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, gin.H{"deleted": true, "id": id})
}
