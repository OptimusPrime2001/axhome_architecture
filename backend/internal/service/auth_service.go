package service

import (
	"axhome_server/config"
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/dto"
	"axhome_server/internal/repository"
	"axhome_server/internal/utils"
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"net/netip"
	"strings"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	Login(ctx context.Context, req dto.LoginRequest, userAgent, clientIP string) (*dto.LoginResponse, error)
	Logout(ctx context.Context, refreshToken string) error
	GetMe(ctx context.Context, userID uuid.UUID) (*dto.UserResponse, error)
	UpdateProfile(ctx context.Context, userID uuid.UUID, req dto.UpdateProfileRequest) (*dto.UserResponse, error)
	ChangePassword(ctx context.Context, userID uuid.UUID, req dto.ChangePasswordRequest) error
}

type authService struct {
	repo   repository.AuthRepository
	jwtCfg config.JWTConfig
}

func NewAuthService(repo repository.AuthRepository, jwtCfg config.JWTConfig) AuthService {
	if jwtCfg.AccessTokenTTL <= 0 {
		jwtCfg.AccessTokenTTL = 24 * time.Hour
	}
	if jwtCfg.RefreshTokenTTL <= 0 {
		jwtCfg.RefreshTokenTTL = 7 * 24 * time.Hour
	}
	return &authService{
		repo:   repo,
		jwtCfg: jwtCfg,
	}
}

func (s *authService) Login(ctx context.Context, req dto.LoginRequest, userAgent, clientIP string) (*dto.LoginResponse, error) {
	email := strings.TrimSpace(strings.ToLower(req.Email))
	user, err := s.repo.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, utils.NewError(utils.MsgInvalidCredentials, utils.ErrCodeUnauthorized)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, utils.NewError(utils.MsgInvalidCredentials, utils.ErrCodeUnauthorized)
	}

	accessToken, err := utils.GenerateAccessToken(
		s.jwtCfg.Secret,
		s.jwtCfg.AccessTokenTTL,
		user.ID,
		user.Email,
		string(user.Role),
	)
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	rawRefresh, tokenHash, err := generateRefreshTokenPair()
	if err != nil {
		return nil, utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	var parsedIP *netip.Addr
	if addr, err := netip.ParseAddr(strings.TrimSpace(clientIP)); err == nil {
		parsedIP = &addr
	}
	ua := strings.TrimSpace(userAgent)

	_ = s.repo.CreateRefreshToken(ctx, sqlc.CreateRefreshTokenParams{
		UserID:    user.ID,
		TokenHash: tokenHash,
		UserAgent: &ua,
		Ip:        parsedIP,
		ExpiresAt: time.Now().Add(s.jwtCfg.RefreshTokenTTL),
	})

	return &dto.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: rawRefresh,
		User:         mapUserToDTO(user),
	}, nil
}

func (s *authService) Logout(ctx context.Context, refreshToken string) error {
	trimmed := strings.TrimSpace(refreshToken)
	if trimmed == "" {
		return nil
	}
	sum := sha256.Sum256([]byte(trimmed))
	tokenHash := hex.EncodeToString(sum[:])
	return s.repo.RevokeRefreshToken(ctx, tokenHash)
}

func (s *authService) GetMe(ctx context.Context, userID uuid.UUID) (*dto.UserResponse, error) {
	user, err := s.repo.GetUserById(ctx, userID)
	if err != nil {
		return nil, err
	}
	res := mapUserToDTO(user)
	return &res, nil
}

func (s *authService) UpdateProfile(ctx context.Context, userID uuid.UUID, req dto.UpdateProfileRequest) (*dto.UserResponse, error) {
	current, err := s.repo.GetUserById(ctx, userID)
	if err != nil {
		return nil, err
	}

	fullName := strings.TrimSpace(req.FullName)
	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" {
		email = current.Email
	}

	updated, err := s.repo.UpdateUserProfile(ctx, userID, fullName, email)
	if err != nil {
		return nil, err
	}

	res := mapUserToDTO(updated)
	return &res, nil
}

func (s *authService) ChangePassword(ctx context.Context, userID uuid.UUID, req dto.ChangePasswordRequest) error {
	user, err := s.repo.GetUserById(ctx, userID)
	if err != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.CurrentPassword)); err != nil {
		return utils.NewError(utils.MsgCurrentPasswordMismatch, utils.ErrCodeBadRequest)
	}

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return utils.WrapAppError(err, utils.MsgInternalServer, utils.ErrCodeInternal)
	}

	if err := s.repo.UpdateUserPassword(ctx, userID, string(hashedBytes)); err != nil {
		return err
	}

	_ = s.repo.RevokeAllUserRefreshTokens(ctx, userID)
	return nil
}

func mapUserToDTO(u *sqlc.User) dto.UserResponse {
	return dto.UserResponse{
		ID:        u.ID,
		Email:     u.Email,
		FullName:  u.FullName,
		Role:      string(u.Role),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}

func generateRefreshTokenPair() (rawToken string, tokenHash string, err error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", "", err
	}
	rawToken = hex.EncodeToString(b)
	sum := sha256.Sum256([]byte(rawToken))
	tokenHash = hex.EncodeToString(sum[:])
	return rawToken, tokenHash, nil
}
