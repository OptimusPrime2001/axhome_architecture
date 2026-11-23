package service

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/dto"
	"axhome_server/internal/repository"
	"axhome_server/internal/utils"
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
)

type UserService interface {
	ListUsers(ctx context.Context, query dto.ListUsersQuery) (*dto.ListUsersResponse, error)
	GetUserByID(ctx context.Context, id uuid.UUID) (*dto.UserResponse, error)
	CreateUser(ctx context.Context, req dto.CreateUserRequest) (*dto.UserResponse, error)
	UpdateUser(ctx context.Context, actorID, targetID uuid.UUID, req dto.UpdateUserRequest) (*dto.UserResponse, error)
	DeleteUser(ctx context.Context, actorID, targetID uuid.UUID) error
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

func mapSQLCUserToDTO(u sqlc.User) dto.UserResponse {
	return dto.UserResponse{
		ID:        u.ID,
		Email:     u.Email,
		FullName:  u.FullName,
		Role:      string(u.Role),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}

func (s *userService) ListUsers(ctx context.Context, query dto.ListUsersQuery) (*dto.ListUsersResponse, error) {
	limit := query.Limit
	if limit <= 0 {
		limit = 100
	}
	offset := query.Offset
	if offset < 0 {
		offset = 0
	}

	users, err := s.repo.ListUsers(ctx, sqlc.ListUsersParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	total, err := s.repo.CountUsers(ctx)
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	items := make([]dto.UserResponse, 0, len(users))
	for _, u := range users {
		items = append(items, mapSQLCUserToDTO(u))
	}

	return &dto.ListUsersResponse{
		Items: items,
		Total: total,
	}, nil
}

func (s *userService) GetUserByID(ctx context.Context, id uuid.UUID) (*dto.UserResponse, error) {
	user, err := s.repo.GetUserByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgUserNotFound, utils.ErrCodeNotFound)
		}
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	res := mapSQLCUserToDTO(user)
	return &res, nil
}

func (s *userService) CreateUser(ctx context.Context, req dto.CreateUserRequest) (*dto.UserResponse, error) {
	normalizedEmail := strings.TrimSpace(strings.ToLower(req.Email))
	fullName := strings.TrimSpace(req.FullName)

	_, err := s.repo.GetUserByEmail(ctx, normalizedEmail)
	if err == nil {
		return nil, utils.NewError(utils.MsgEmailAlreadyExists, utils.ErrCodeConflict)
	}
	if !errors.Is(err, pgx.ErrNoRows) {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	created, err := s.repo.CreateUser(ctx, sqlc.CreateUserParams{
		Email:        normalizedEmail,
		PasswordHash: string(hashedBytes),
		FullName:     fullName,
		Role:         sqlc.UserRole(req.Role),
	})
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	res := mapSQLCUserToDTO(created)
	return &res, nil
}

func (s *userService) UpdateUser(ctx context.Context, actorID, targetID uuid.UUID, req dto.UpdateUserRequest) (*dto.UserResponse, error) {
	existing, err := s.repo.GetUserByID(ctx, targetID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgUserNotFound, utils.ErrCodeNotFound)
		}
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	normalizedEmail := strings.TrimSpace(strings.ToLower(req.Email))
	fullName := strings.TrimSpace(req.FullName)
	nextRole := sqlc.UserRole(req.Role)

	// Check email uniqueness when email is changed
	if !strings.EqualFold(existing.Email, normalizedEmail) {
		other, lookupErr := s.repo.GetUserByEmail(ctx, normalizedEmail)
		if lookupErr == nil && other.ID != existing.ID {
			return nil, utils.NewError(utils.MsgEmailAlreadyExists, utils.ErrCodeConflict)
		}
		if lookupErr != nil && !errors.Is(lookupErr, pgx.ErrNoRows) {
			return nil, utils.WrapAppError(lookupErr, utils.MsgInternalServer, utils.ErrCodeInternal)
		}
	}

	// Guard: prevent demoting the last remaining admin
	if existing.Role == sqlc.UserRoleAdmin && nextRole != sqlc.UserRoleAdmin {
		adminCount, countErr := s.repo.CountUsersByRole(ctx, sqlc.UserRoleAdmin)
		if countErr != nil {
			return nil, utils.WrapAppError(countErr, utils.MsgInternalServer, utils.ErrCodeInternal)
		}
		if adminCount <= 1 {
			return nil, utils.NewError("Không thể hạ quyền quản trị viên duy nhất còn lại của hệ thống", utils.ErrCodeBadRequest)
		}
	}

	updated, err := s.repo.UpdateUserByAdmin(ctx, sqlc.UpdateUserByAdminParams{
		ID:       targetID,
		FullName: fullName,
		Email:    normalizedEmail,
		Role:     nextRole,
	})
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	// Optional password reset by admin
	passwordChanged := strings.TrimSpace(req.NewPassword) != ""
	if passwordChanged {
		hashedBytes, hashErr := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
		if hashErr != nil {
			return nil, utils.WrapAppError(hashErr, utils.MsgInternalServer, utils.ErrCodeInternal)
		}
		if err := s.repo.UpdateUserPassword(ctx, sqlc.UpdateUserPasswordParams{
			ID:           targetID,
			PasswordHash: string(hashedBytes),
		}); err != nil {
			return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
		}
	}

	// Revoke existing sessions if role or password changed (for another user)
	if (existing.Role != nextRole || passwordChanged) && actorID != targetID {
		_ = s.repo.RevokeAllUserRefreshTokens(ctx, targetID)
	}

	res := mapSQLCUserToDTO(updated)
	return &res, nil
}

func (s *userService) DeleteUser(ctx context.Context, actorID, targetID uuid.UUID) error {
	if actorID == targetID {
		return utils.NewError("Không thể tự xóa tài khoản đang đăng nhập", utils.ErrCodeBadRequest)
	}

	existing, err := s.repo.GetUserByID(ctx, targetID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return utils.NewError(utils.MsgUserNotFound, utils.ErrCodeNotFound)
		}
		return utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	if existing.Role == sqlc.UserRoleAdmin {
		adminCount, countErr := s.repo.CountUsersByRole(ctx, sqlc.UserRoleAdmin)
		if countErr != nil {
			return utils.WrapAppError(countErr, utils.MsgInternalServer, utils.ErrCodeInternal)
		}
		if adminCount <= 1 {
			return utils.NewError("Không thể xóa quản trị viên duy nhất còn lại của hệ thống", utils.ErrCodeBadRequest)
		}
	}

	if err := s.repo.DeleteAllUserRefreshTokens(ctx, targetID); err != nil {
		return utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	if err := s.repo.DeleteUser(ctx, targetID); err != nil {
		return utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	return nil
}
