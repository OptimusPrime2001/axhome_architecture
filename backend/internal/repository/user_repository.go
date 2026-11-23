package repository

import (
	"axhome_server/internal/db/sqlc"
	"context"

	"github.com/google/uuid"
)

type UserRepository interface {
	ListUsers(ctx context.Context, arg sqlc.ListUsersParams) ([]sqlc.User, error)
	CountUsers(ctx context.Context) (int64, error)
	CountUsersByRole(ctx context.Context, role sqlc.UserRole) (int64, error)
	GetUserByID(ctx context.Context, id uuid.UUID) (sqlc.User, error)
	GetUserByEmail(ctx context.Context, email string) (sqlc.User, error)
	CreateUser(ctx context.Context, arg sqlc.CreateUserParams) (sqlc.User, error)
	UpdateUserByAdmin(ctx context.Context, arg sqlc.UpdateUserByAdminParams) (sqlc.User, error)
	UpdateUserPassword(ctx context.Context, arg sqlc.UpdateUserPasswordParams) error
	DeleteUser(ctx context.Context, id uuid.UUID) error
	RevokeAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error
	DeleteAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error
}

type userRepository struct {
	db sqlc.Querier
}

func NewUserRepository(db sqlc.Querier) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) ListUsers(ctx context.Context, arg sqlc.ListUsersParams) ([]sqlc.User, error) {
	return r.db.ListUsers(ctx, arg)
}

func (r *userRepository) CountUsers(ctx context.Context) (int64, error) {
	return r.db.CountUsers(ctx)
}

func (r *userRepository) CountUsersByRole(ctx context.Context, role sqlc.UserRole) (int64, error) {
	return r.db.CountUsersByRole(ctx, role)
}

func (r *userRepository) GetUserByID(ctx context.Context, id uuid.UUID) (sqlc.User, error) {
	return r.db.GetUserById(ctx, id)
}

func (r *userRepository) GetUserByEmail(ctx context.Context, email string) (sqlc.User, error) {
	return r.db.GetUserByEmail(ctx, email)
}

func (r *userRepository) CreateUser(ctx context.Context, arg sqlc.CreateUserParams) (sqlc.User, error) {
	return r.db.CreateUser(ctx, arg)
}

func (r *userRepository) UpdateUserByAdmin(ctx context.Context, arg sqlc.UpdateUserByAdminParams) (sqlc.User, error) {
	return r.db.UpdateUserByAdmin(ctx, arg)
}

func (r *userRepository) UpdateUserPassword(ctx context.Context, arg sqlc.UpdateUserPasswordParams) error {
	return r.db.UpdateUserPassword(ctx, arg)
}

func (r *userRepository) DeleteUser(ctx context.Context, id uuid.UUID) error {
	return r.db.DeleteUser(ctx, id)
}

func (r *userRepository) RevokeAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error {
	return r.db.RevokeAllUserRefreshTokens(ctx, userID)
}

func (r *userRepository) DeleteAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error {
	return r.db.DeleteAllUserRefreshTokens(ctx, userID)
}
