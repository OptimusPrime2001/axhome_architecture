package dto

type ListUsersQuery struct {
	Limit  int32 `form:"limit" binding:"omitempty,min=1,max=100"`
	Offset int32 `form:"offset" binding:"omitempty,min=0"`
}

type CreateUserRequest struct {
	FullName string `json:"full_name" binding:"required,min=2,max=100"`
	Email    string `json:"email" binding:"required,email,max=255"`
	Password string `json:"password" binding:"required,min=8,max=72"`
	Role     string `json:"role" binding:"required,oneof=admin editor viewer"`
}

type UpdateUserRequest struct {
	FullName    string `json:"full_name" binding:"required,min=2,max=100"`
	Email       string `json:"email" binding:"required,email,max=255"`
	Role        string `json:"role" binding:"required,oneof=admin editor viewer"`
	NewPassword string `json:"new_password" binding:"omitempty,min=8,max=72"`
}

type ListUsersResponse struct {
	Items []UserResponse `json:"items"`
	Total int64          `json:"total"`
}
