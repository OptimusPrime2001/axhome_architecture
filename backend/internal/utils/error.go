package utils

import (
	"net/http"
)

type ErrorCode string

type AppError struct {
	Err     error
	Message string
	Code    ErrorCode
}

const (
	ErrCodeBadRequest      ErrorCode = "BAD_REQUEST"
	ErrCodeUnauthorized    ErrorCode = "UNAUTHORIZED"
	ErrCodeForbidden       ErrorCode = "FORBIDDEN"
	ErrCodeNotFound        ErrorCode = "NOT_FOUND"
	ErrCodeConflict        ErrorCode = "CONFLICT"
	ErrCodePayloadTooLarge ErrorCode = "PAYLOAD_TOO_LARGE"
	ErrCodeTooManyRequests ErrorCode = "TOO_MANY_REQUESTS"
	ErrCodeInternal        ErrorCode = "INTERNAL_SERVER_ERROR"
)

const (
	MsgUserNotFound            = "Không tìm thấy người dùng"
	MsgEmailAlreadyExists      = "Email đã được sử dụng"
	MsgInvalidCredentials      = "Email hoặc mật khẩu không chính xác"
	MsgCurrentPasswordMismatch = "Mật khẩu hiện tại không chính xác"
	MsgInvalidToken            = "Token không hợp lệ hoặc đã hết hạn"
	MsgForbidden               = "Bạn không có quyền thực hiện thao tác này"
	MsgProjectNotFound         = "Không tìm thấy dự án"
	MsgProjectSlugExists       = "Đường dẫn (slug) dự án đã tồn tại"
	MsgLeadNotFound            = "Không tìm thấy yêu cầu tư vấn"
	MsgInvalidMediaFile        = "Tệp hình ảnh không hợp lệ (chỉ hỗ trợ JPG, PNG, WebP, AVIF)"
	MsgStorageNotConfigured    = "Chưa cấu hình kết nối Cloudflare R2 Storage trên máy chủ"
	MsgPayloadTooLarge         = "Dung lượng dữ liệu gửi lên vượt quá giới hạn cho phép"
	MsgTooManyRequests         = "Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau"
	MsgInternalServer          = "Đã xảy ra lỗi hệ thống"
)

func (e *AppError) Error() string {
	return e.Message
}

func (e *AppError) Unwrap() error {
	return e.Err
}

func NewError(message string, code ErrorCode) *AppError {
	return &AppError{
		Message: message,
		Code:    code,
	}
}

func WrapAppError(systemErr error, message string, code ErrorCode) *AppError {
	return &AppError{
		Err:     systemErr,
		Message: message,
		Code:    code,
	}
}

func httpStatusFromErrorCode(code ErrorCode) int {
	switch code {
	case ErrCodeBadRequest:
		return http.StatusBadRequest
	case ErrCodeUnauthorized:
		return http.StatusUnauthorized
	case ErrCodeForbidden:
		return http.StatusForbidden
	case ErrCodeNotFound:
		return http.StatusNotFound
	case ErrCodeConflict:
		return http.StatusConflict
	case ErrCodePayloadTooLarge:
		return http.StatusRequestEntityTooLarge
	case ErrCodeTooManyRequests:
		return http.StatusTooManyRequests
	default:
		return http.StatusInternalServerError
	}
}
