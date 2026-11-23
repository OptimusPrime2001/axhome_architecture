package repository

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/utils"
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type LeadRepository interface {
	Create(ctx context.Context, arg sqlc.CreateConsultationLeadParams) (*sqlc.ConsultationLead, error)
	GetByID(ctx context.Context, id uuid.UUID) (*sqlc.ConsultationLead, error)
	ListWithCount(ctx context.Context, listArg sqlc.ListConsultationLeadsParams, countArg sqlc.CountConsultationLeadsParams) ([]sqlc.ConsultationLead, int32, error)
	Update(ctx context.Context, arg sqlc.UpdateConsultationLeadParams) (*sqlc.ConsultationLead, error)
	Delete(ctx context.Context, id uuid.UUID) error
	GetStats(ctx context.Context) ([]sqlc.GetConsultationLeadStatsRow, error)
}

type leadRepository struct {
	db sqlc.Querier
}

func NewLeadRepository(db sqlc.Querier) LeadRepository {
	return &leadRepository{
		db: db,
	}
}

func (r *leadRepository) Create(ctx context.Context, arg sqlc.CreateConsultationLeadParams) (*sqlc.ConsultationLead, error) {
	lead, err := r.db.CreateConsultationLead(ctx, arg)
	if err != nil {
		return nil, err
	}
	return &lead, nil
}

func (r *leadRepository) GetByID(ctx context.Context, id uuid.UUID) (*sqlc.ConsultationLead, error) {
	lead, err := r.db.GetConsultationLeadByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgLeadNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return &lead, nil
}

func (r *leadRepository) ListWithCount(
	ctx context.Context,
	listArg sqlc.ListConsultationLeadsParams,
	countArg sqlc.CountConsultationLeadsParams,
) ([]sqlc.ConsultationLead, int32, error) {
	total, err := r.db.CountConsultationLeads(ctx, countArg)
	if err != nil {
		return nil, 0, err
	}

	items, err := r.db.ListConsultationLeads(ctx, listArg)
	if err != nil {
		return nil, 0, err
	}

	return items, total, nil
}

func (r *leadRepository) Update(ctx context.Context, arg sqlc.UpdateConsultationLeadParams) (*sqlc.ConsultationLead, error) {
	lead, err := r.db.UpdateConsultationLead(ctx, arg)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgLeadNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return &lead, nil
}

func (r *leadRepository) Delete(ctx context.Context, id uuid.UUID) error {
	if _, err := r.db.GetConsultationLeadByID(ctx, id); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return utils.NewError(utils.MsgLeadNotFound, utils.ErrCodeNotFound)
		}
		return err
	}
	return r.db.DeleteConsultationLead(ctx, id)
}

func (r *leadRepository) GetStats(ctx context.Context) ([]sqlc.GetConsultationLeadStatsRow, error) {
	return r.db.GetConsultationLeadStats(ctx)
}
