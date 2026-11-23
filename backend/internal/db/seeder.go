package db

import (
	"axhome_server/config"
	"axhome_server/internal/db/sqlc"
	"context"
	_ "embed"
	"errors"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
	"golang.org/x/crypto/bcrypt"
)

var (
	//go:embed migration/000002_create_refresh_token_table.up.sql
	migration002 string
	//go:embed migration/000003_create_projects_tables.up.sql
	migration003 string
	//go:embed migration/000004_create_leads_table.up.sql
	migration004 string
)

const idempotentUsersDDL = `
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`

// EnsureSchemaAndSeed guarantees all required tables exist and seeds the initial admin user if missing.
func EnsureSchemaAndSeed(ctx context.Context, pool *pgxpool.Pool, store Store, cfg *config.Config) error {
	if pool == nil || store == nil || cfg == nil {
		return nil
	}

	ddlScripts := []string{
		idempotentUsersDDL,
		strings.ReplaceAll(migration002, "CREATE INDEX idx_refresh_tokens_user_id", "CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id"),
		migration003,
		migration004,
	}

	for _, script := range ddlScripts {
		if _, err := pool.Exec(ctx, script); err != nil {
			return err
		}
	}

	adminEmail := strings.TrimSpace(strings.ToLower(cfg.AdminSeed.Email))
	if adminEmail == "" {
		return nil
	}

	_, err := store.GetUserByEmail(ctx, adminEmail)
	if err == nil {
		return nil
	}
	if !errors.Is(err, pgx.ErrNoRows) {
		return err
	}

	hashedBytes, err := bcrypt.GenerateFromPassword([]byte(cfg.AdminSeed.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	created, err := store.CreateUser(ctx, sqlc.CreateUserParams{
		Email:        adminEmail,
		PasswordHash: string(hashedBytes),
		FullName:     cfg.AdminSeed.FullName,
		Role:         sqlc.UserRoleAdmin,
	})
	if err != nil {
		return err
	}

	log.Info().
		Str("email", created.Email).
		Str("role", string(created.Role)).
		Msg("Seeded default Super Admin user")

	return nil
}
