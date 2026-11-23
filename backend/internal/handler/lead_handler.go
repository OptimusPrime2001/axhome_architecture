package handler

import (
	"axhome_server/internal/dto"
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type LeadHandler struct {
	service service.LeadService
}

func NewLeadHandler(svc service.LeadService) *LeadHandler {
	return &LeadHandler{
		service: svc,
	}
}

func (h *LeadHandler) CreatePublicLead(ctx *gin.Context) {
	var req dto.CreateLeadRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Vui lòng điền đầy đủ họ tên và số điện thoại liên hệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.CreatePublicLead(ctx.Request.Context(), req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusCreated, res)
}

func (h *LeadHandler) ListAdminLeads(ctx *gin.Context) {
	var query dto.LeadFilterQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		utils.ResponseError(ctx, utils.NewError("Tham số lọc danh sách tư vấn không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.ListAdminLeads(ctx.Request.Context(), query)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *LeadHandler) GetAdminLeadStats(ctx *gin.Context) {
	res, err := h.service.GetAdminLeadStats(ctx.Request.Context())
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *LeadHandler) GetAdminLeadByID(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã yêu cầu tư vấn (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.GetAdminLeadByID(ctx.Request.Context(), id)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *LeadHandler) UpdateAdminLead(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã yêu cầu tư vấn (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	var req dto.UpdateLeadRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Dữ liệu cập nhật yêu cầu tư vấn không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.UpdateAdminLead(ctx.Request.Context(), id, req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *LeadHandler) DeleteAdminLead(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã yêu cầu tư vấn (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	if err := h.service.DeleteAdminLead(ctx.Request.Context(), id); err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, gin.H{"deleted": true, "id": id})
}
