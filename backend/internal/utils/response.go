package utils

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func ResponseError(ctx *gin.Context, err error) {
	var maxBytesErr *http.MaxBytesError
	if errors.As(err, &maxBytesErr) {
		ctx.AbortWithStatusJSON(http.StatusRequestEntityTooLarge, gin.H{
			"code": ErrCodePayloadTooLarge,
			"msg":  MsgPayloadTooLarge,
		})
		return
	}

	var appErr *AppError
	if errors.As(err, &appErr) {
		statusCode := httpStatusFromErrorCode(appErr.Code)
		if appErr.Err != nil {
			log.Error().
				Str("code", string(appErr.Code)).
				Str("msg", appErr.Message).
				Err(appErr.Err).
				Msg("application error")
		}
		ctx.AbortWithStatusJSON(statusCode, gin.H{
			"code": appErr.Code,
			"msg":  appErr.Message,
		})
		return
	}

	log.Error().Err(err).Msg("unexpected internal error")
	ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
		"code": ErrCodeInternal,
		"msg":  MsgInternalServer,
	})
}

func ResponseSuccess(ctx *gin.Context, status int, data any) {
	ctx.JSON(status, gin.H{
		"code": status,
		"msg":  "success",
		"data": data,
	})
}

func ResponseValidator(ctx *gin.Context, data any) {
	ctx.JSON(http.StatusBadRequest, data)
}
