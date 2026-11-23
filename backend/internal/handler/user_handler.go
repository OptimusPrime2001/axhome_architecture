package handler

import (
	"axhome_server/internal/dto"
	"axhome_server/internal/middleware"
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserHandler struct {
	service service.UserService
}

func NewUserHandler(svc service.UserService) *UserHandler {
	return &UserHandler{service: svc}
}

func (h *UserHandler) ListUsers(ctx *gin.Context) {
	var query dto.ListUsersQuery
	if err := ctx.ShouldBindQuery(&query); err != nil {
		utils.ResponseError(ctx, utils.NewError("Tham số danh sách tài khoản không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.ListUsers(ctx.Request.Context(), query)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *UserHandler) GetUserByID(ctx *gin.Context) {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã tài khoản (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.GetUserByID(ctx.Request.Context(), id)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *UserHandler) CreateUser(ctx *gin.Context) {
	var req dto.CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Dữ liệu tạo tài khoản không hợp lệ (mật khẩu tối thiểu 8 ký tự, vai trò hợp lệ)", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.CreateUser(ctx.Request.Context(), req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusCreated, res)
}

func (h *UserHandler) UpdateUser(ctx *gin.Context) {
	claims, ok := middleware.GetAuthClaims(ctx)
	if !ok {
		utils.ResponseError(ctx, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
		return
	}

	targetID, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã tài khoản (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	var req dto.UpdateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Dữ liệu cập nhật tài khoản không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.UpdateUser(ctx.Request.Context(), claims.UserID, targetID, req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *UserHandler) DeleteUser(ctx *gin.Context) {
	claims, ok := middleware.GetAuthClaims(ctx)
	if !ok {
		utils.ResponseError(ctx, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
		return
	}

	targetID, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		utils.ResponseError(ctx, utils.NewError("Mã tài khoản (UUID) không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	if err := h.service.DeleteUser(ctx.Request.Context(), claims.UserID, targetID); err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, gin.H{"deleted": true})
}
