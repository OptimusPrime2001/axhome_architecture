package handler

import (
	"axhome_server/internal/dto"
	"axhome_server/internal/middleware"
	"axhome_server/internal/service"
	"axhome_server/internal/utils"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

const RefreshTokenCookieName = "refresh_token"

type AuthHandler struct {
	service         service.AuthService
	accessTokenTTL  time.Duration
	refreshTokenTTL time.Duration
	isProduction    bool
}

type AuthHandlerOption func(*AuthHandler)

func WithCookieConfig(ttl time.Duration, isProduction bool) AuthHandlerOption {
	return func(h *AuthHandler) {
		if ttl > 0 {
			h.accessTokenTTL = ttl
		}
		h.isProduction = isProduction
	}
}

func NewAuthHandler(svc service.AuthService, opts ...AuthHandlerOption) *AuthHandler {
	h := &AuthHandler{
		service:         svc,
		accessTokenTTL:  24 * time.Hour,
		refreshTokenTTL: 7 * 24 * time.Hour,
		isProduction:    false,
	}
	for _, opt := range opts {
		opt(h)
	}
	return h
}

func (h *AuthHandler) Login(ctx *gin.Context) {
	var req dto.LoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Vui lòng nhập email và mật khẩu hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	res, err := h.service.Login(ctx.Request.Context(), req, ctx.Request.UserAgent(), ctx.ClientIP())
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	ctx.SetSameSite(http.SameSiteLaxMode)
	// Store access_token in HttpOnly cookie (httpOnly = true)
	ctx.SetCookie(
		middleware.AccessTokenCookieName,
		res.AccessToken,
		int(h.accessTokenTTL.Seconds()),
		"/",
		"",
		h.isProduction,
		true,
	)
	// Store refresh_token in HttpOnly cookie (httpOnly = true)
	ctx.SetCookie(
		RefreshTokenCookieName,
		res.RefreshToken,
		int(h.refreshTokenTTL.Seconds()),
		"/",
		"",
		h.isProduction,
		true,
	)

	utils.ResponseSuccess(ctx, http.StatusOK, res)
}

func (h *AuthHandler) Logout(ctx *gin.Context) {
	var req dto.LogoutRequest
	_ = ctx.ShouldBindJSON(&req)

	refreshToken := strings.TrimSpace(req.RefreshToken)
	if refreshToken == "" {
		if cookieRefresh, err := ctx.Cookie(RefreshTokenCookieName); err == nil {
			refreshToken = strings.TrimSpace(cookieRefresh)
		}
	}

	if err := h.service.Logout(ctx.Request.Context(), refreshToken); err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	ctx.SetSameSite(http.SameSiteLaxMode)
	ctx.SetCookie(
		middleware.AccessTokenCookieName,
		"",
		-1,
		"/",
		"",
		h.isProduction,
		true,
	)
	ctx.SetCookie(
		RefreshTokenCookieName,
		"",
		-1,
		"/",
		"",
		h.isProduction,
		true,
	)

	utils.ResponseSuccess(ctx, http.StatusOK, gin.H{"logged_out": true})
}

func (h *AuthHandler) GetMe(ctx *gin.Context) {
	claims, ok := middleware.GetAuthClaims(ctx)
	if !ok {
		utils.ResponseError(ctx, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
		return
	}

	user, err := h.service.GetMe(ctx.Request.Context(), claims.UserID)
	if err != nil {
		if strings.Contains(err.Error(), "stateless") {
			utils.ResponseSuccess(ctx, http.StatusOK, dto.UserResponse{
				ID:       claims.UserID,
				Email:    claims.Email,
				FullName: "Quản trị viên Axhome",
				Role:     claims.Role,
			})
			return
		}
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, user)
}

func (h *AuthHandler) UpdateProfile(ctx *gin.Context) {
	claims, ok := middleware.GetAuthClaims(ctx)
	if !ok {
		utils.ResponseError(ctx, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
		return
	}

	var req dto.UpdateProfileRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Thông tin hồ sơ không hợp lệ", utils.ErrCodeBadRequest))
		return
	}

	updated, err := h.service.UpdateProfile(ctx.Request.Context(), claims.UserID, req)
	if err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, updated)
}

func (h *AuthHandler) ChangePassword(ctx *gin.Context) {
	claims, ok := middleware.GetAuthClaims(ctx)
	if !ok {
		utils.ResponseError(ctx, utils.NewError(utils.MsgInvalidToken, utils.ErrCodeUnauthorized))
		return
	}

	var req dto.ChangePasswordRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ResponseError(ctx, utils.NewError("Dữ liệu mật khẩu không hợp lệ (tối thiểu 6 ký tự)", utils.ErrCodeBadRequest))
		return
	}

	if err := h.service.ChangePassword(ctx.Request.Context(), claims.UserID, req); err != nil {
		utils.ResponseError(ctx, err)
		return
	}

	utils.ResponseSuccess(ctx, http.StatusOK, gin.H{"password_updated": true})
}
