package db

import (
	"axhome_server/internal/db/sqlc"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Store wraps sqlc.Querier with atomic database transaction support.
type Store interface {
	sqlc.Querier
	ExecTx(ctx context.Context, fn func(q sqlc.Querier) error) error
}

type SQLStore struct {
	*sqlc.Queries
	pool *pgxpool.Pool
}

func NewStore(pool *pgxpool.Pool) Store {
	return &SQLStore{
		Queries: sqlc.New(pool),
		pool:    pool,
	}
}

func (s *SQLStore) ExecTx(ctx context.Context, fn func(q sqlc.Querier) error) error {
	if s.pool == nil {
		return fn(s.Queries)
	}

	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin db transaction: %w", err)
	}

	qTx := s.Queries.WithTx(tx)
	if err := fn(qTx); err != nil {
		if rbErr := tx.Rollback(ctx); rbErr != nil {
			return fmt.Errorf("tx error: %v, rollback error: %w", err, rbErr)
		}
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit db transaction: %w", err)
	}
	return nil
}
