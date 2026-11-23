package dto

import (
	"time"

	"github.com/google/uuid"
)

// Request DTOs
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LogoutRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type UpdateProfileRequest struct {
	FullName string `json:"full_name" binding:"required,min=2,max=100"`
	Email    string `json:"email" binding:"omitempty,email"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" binding:"required"`
	NewPassword     string `json:"new_password" binding:"required,min=6"`
}

// Response DTOs
type UserResponse struct {
	ID        uuid.UUID `json:"id"`
	Email     string    `json:"email"`
	FullName  string    `json:"full_name"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type LoginResponse struct {
	AccessToken  string       `json:"access_token"`
	ExpiresIn    int64        `json:"expires_in"`
	RefreshToken string       `json:"refresh_token"`
	User         UserResponse `json:"user"`
}
