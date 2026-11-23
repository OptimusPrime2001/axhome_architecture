package repository

import (
	"axhome_server/internal/db"
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/utils"
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

type AuthRepository interface {
	GetUserByEmail(ctx context.Context, email string) (*sqlc.User, error)
	GetUserById(ctx context.Context, id uuid.UUID) (*sqlc.User, error)
	UpdateUserProfile(ctx context.Context, id uuid.UUID, fullName, email string) (*sqlc.User, error)
	UpdateUserPassword(ctx context.Context, id uuid.UUID, passwordHash string) error
	CreateRefreshToken(ctx context.Context, arg sqlc.CreateRefreshTokenParams) error
	SaveDeviceRefreshToken(ctx context.Context, arg sqlc.CreateRefreshTokenParams) error
	DeleteRefreshTokenByHash(ctx context.Context, tokenHash string) error
	DeleteAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error
	RevokeRefreshToken(ctx context.Context, tokenHash string) error
	RevokeAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error
}

type authRepository struct {
	db sqlc.Querier
}

func NewAuthRepository(db sqlc.Querier) AuthRepository {
	return &authRepository{
		db: db,
	}
}

func (r *authRepository) GetUserByEmail(ctx context.Context, email string) (*sqlc.User, error) {
	if r.db == nil {
		return nil, errors.New("stateless: db is nil")
	}
	user, err := r.db.GetUserByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgUserNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return &user, nil
}

func (r *authRepository) GetUserById(ctx context.Context, id uuid.UUID) (*sqlc.User, error) {
	if r.db == nil {
		return nil, errors.New("stateless: db is nil")
	}
	user, err := r.db.GetUserById(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgUserNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return &user, nil
}

func (r *authRepository) UpdateUserProfile(ctx context.Context, id uuid.UUID, fullName, email string) (*sqlc.User, error) {
	if r.db == nil {
		return nil, errors.New("stateless: db is nil")
	}
	user, err := r.db.UpdateUserProfile(ctx, sqlc.UpdateUserProfileParams{
		ID:       id,
		FullName: fullName,
		Email:    email,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgUserNotFound, utils.ErrCodeNotFound)
		}
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return nil, utils.NewError(utils.MsgEmailAlreadyExists, utils.ErrCodeConflict)
		}
		return nil, err
	}
	return &user, nil
}

func (r *authRepository) UpdateUserPassword(ctx context.Context, id uuid.UUID, passwordHash string) error {
	if r.db == nil {
		return errors.New("stateless: db is nil")
	}
	return r.db.UpdateUserPassword(ctx, sqlc.UpdateUserPasswordParams{
		ID:           id,
		PasswordHash: passwordHash,
	})
}

func (r *authRepository) CreateRefreshToken(ctx context.Context, arg sqlc.CreateRefreshTokenParams) error {
	if r.db == nil {
		return nil
	}
	return r.db.CreateRefreshToken(ctx, arg)
}

// SaveDeviceRefreshToken cleans up expired/revoked tokens for the user, replaces any existing
// token for the same device (user_agent), and inserts the fresh refresh token atomically.
func (r *authRepository) SaveDeviceRefreshToken(ctx context.Context, arg sqlc.CreateRefreshTokenParams) error {
	if r.db == nil {
		return nil
	}

	run := func(q sqlc.Querier) error {
		if err := q.DeleteExpiredOrRevokedRefreshTokens(ctx, arg.UserID); err != nil {
			return err
		}
		if err := q.DeleteUserRefreshTokensByDevice(ctx, sqlc.DeleteUserRefreshTokensByDeviceParams{
			UserID:    arg.UserID,
			UserAgent: arg.UserAgent,
		}); err != nil {
			return err
		}
		return q.CreateRefreshToken(ctx, arg)
	}

	if store, ok := r.db.(db.Store); ok {
		return store.ExecTx(ctx, run)
	}
	return run(r.db)
}

func (r *authRepository) DeleteRefreshTokenByHash(ctx context.Context, tokenHash string) error {
	if r.db == nil {
		return nil
	}
	return r.db.DeleteRefreshTokenByHash(ctx, tokenHash)
}

func (r *authRepository) DeleteAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error {
	if r.db == nil {
		return nil
	}
	return r.db.DeleteAllUserRefreshTokens(ctx, userID)
}

func (r *authRepository) RevokeRefreshToken(ctx context.Context, tokenHash string) error {
	if r.db == nil {
		return nil
	}
	return r.db.RevokeRefreshToken(ctx, tokenHash)
}

func (r *authRepository) RevokeAllUserRefreshTokens(ctx context.Context, userID uuid.UUID) error {
	if r.db == nil {
		return nil
	}
	return r.db.RevokeAllUserRefreshTokens(ctx, userID)
}
