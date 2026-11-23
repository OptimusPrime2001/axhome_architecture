package service

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/dto"
	"axhome_server/internal/utils"
	"context"
	"errors"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type fakeUserRepo struct {
	users map[uuid.UUID]sqlc.User
}

func newFakeUserRepo(initial ...sqlc.User) *fakeUserRepo {
	m := make(map[uuid.UUID]sqlc.User, len(initial))
	for _, u := range initial {
		m[u.ID] = u
	}
	return &fakeUserRepo{users: m}
}

func (f *fakeUserRepo) ListUsers(_ context.Context, _ sqlc.ListUsersParams) ([]sqlc.User, error) {
	out := make([]sqlc.User, 0, len(f.users))
	for _, u := range f.users {
		out = append(out, u)
	}
	return out, nil
}

func (f *fakeUserRepo) CountUsers(_ context.Context) (int64, error) {
	return int64(len(f.users)), nil
}

func (f *fakeUserRepo) CountUsersByRole(_ context.Context, role sqlc.UserRole) (int64, error) {
	var count int64
	for _, u := range f.users {
		if u.Role == role {
			count++
		}
	}
	return count, nil
}

func (f *fakeUserRepo) GetUserByID(_ context.Context, id uuid.UUID) (sqlc.User, error) {
	u, ok := f.users[id]
	if !ok {
		return sqlc.User{}, pgx.ErrNoRows
	}
	return u, nil
}

func (f *fakeUserRepo) GetUserByEmail(_ context.Context, email string) (sqlc.User, error) {
	for _, u := range f.users {
		if u.Email == email {
			return u, nil
		}
	}
	return sqlc.User{}, pgx.ErrNoRows
}

func (f *fakeUserRepo) CreateUser(_ context.Context, arg sqlc.CreateUserParams) (sqlc.User, error) {
	now := time.Now()
	u := sqlc.User{
		ID:           uuid.New(),
		Email:        arg.Email,
		PasswordHash: arg.PasswordHash,
		FullName:     arg.FullName,
		Role:         arg.Role,
		CreatedAt:    now,
		UpdatedAt:    now,
	}
	f.users[u.ID] = u
	return u, nil
}

func (f *fakeUserRepo) UpdateUserByAdmin(_ context.Context, arg sqlc.UpdateUserByAdminParams) (sqlc.User, error) {
	u, ok := f.users[arg.ID]
	if !ok {
		return sqlc.User{}, pgx.ErrNoRows
	}
	u.FullName = arg.FullName
	u.Email = arg.Email
	u.Role = arg.Role
	f.users[arg.ID] = u
	return u, nil
}

func (f *fakeUserRepo) UpdateUserPassword(_ context.Context, arg sqlc.UpdateUserPasswordParams) error {
	u, ok := f.users[arg.ID]
	if !ok {
		return pgx.ErrNoRows
	}
	u.PasswordHash = arg.PasswordHash
	f.users[arg.ID] = u
	return nil
}

func (f *fakeUserRepo) DeleteUser(_ context.Context, id uuid.UUID) error {
	delete(f.users, id)
	return nil
}

func (f *fakeUserRepo) RevokeAllUserRefreshTokens(_ context.Context, _ uuid.UUID) error {
	return nil
}

func (f *fakeUserRepo) DeleteAllUserRefreshTokens(_ context.Context, _ uuid.UUID) error {
	return nil
}

func TestUserService_CreateAndDuplicateEmail(t *testing.T) {
	repo := newFakeUserRepo()
	svc := NewUserService(repo)

	created, err := svc.CreateUser(context.Background(), dto.CreateUserRequest{
		FullName: "KTS. Minh Quân",
		Email:    "Editor@Axhome.vn",
		Password: "Password123",
		Role:     "editor",
	})
	if err != nil {
		t.Fatalf("expected create to succeed, got %v", err)
	}
	if created.Email != "editor@axhome.vn" || created.Role != "editor" {
		t.Fatalf("unexpected created user: %+v", created)
	}

	_, err = svc.CreateUser(context.Background(), dto.CreateUserRequest{
		FullName: "Duplicate User",
		Email:    "editor@axhome.vn",
		Password: "Password123",
		Role:     "viewer",
	})
	var appErr *utils.AppError
	if !errors.As(err, &appErr) || appErr.Code != utils.ErrCodeConflict {
		t.Fatalf("expected CONFLICT error, got %v", err)
	}
}

func TestUserService_PreventDemotingLastAdmin(t *testing.T) {
	adminID := uuid.New()
	repo := newFakeUserRepo(sqlc.User{
		ID:       adminID,
		Email:    "admin@axhome.vn",
		FullName: "Super Admin",
		Role:     sqlc.UserRoleAdmin,
	})
	svc := NewUserService(repo)

	_, err := svc.UpdateUser(context.Background(), adminID, adminID, dto.UpdateUserRequest{
		FullName: "Super Admin",
		Email:    "admin@axhome.vn",
		Role:     "editor",
	})
	var appErr *utils.AppError
	if !errors.As(err, &appErr) || appErr.Code != utils.ErrCodeBadRequest {
		t.Fatalf("expected BAD_REQUEST when demoting last admin, got %v", err)
	}
}

func TestUserService_DeleteGuards(t *testing.T) {
	adminID := uuid.New()
	viewerID := uuid.New()
	repo := newFakeUserRepo(
		sqlc.User{ID: adminID, Email: "admin@axhome.vn", FullName: "Admin", Role: sqlc.UserRoleAdmin},
		sqlc.User{ID: viewerID, Email: "viewer@axhome.vn", FullName: "Viewer", Role: sqlc.UserRoleViewer},
	)
	svc := NewUserService(repo)

	// Cannot delete self
	err := svc.DeleteUser(context.Background(), adminID, adminID)
	var appErr *utils.AppError
	if !errors.As(err, &appErr) || appErr.Code != utils.ErrCodeBadRequest {
		t.Fatalf("expected BAD_REQUEST when deleting self, got %v", err)
	}

	// Can delete viewer
	if err := svc.DeleteUser(context.Background(), adminID, viewerID); err != nil {
		t.Fatalf("expected deleting viewer to succeed, got %v", err)
	}
	if _, exists := repo.users[viewerID]; exists {
		t.Fatalf("expected viewer to be deleted from repo")
	}
}
