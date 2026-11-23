package service

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/dto"
	"axhome_server/internal/repository"
	"axhome_server/internal/utils"
	"context"
	"fmt"
	"math"
	"strings"
	"time"

	"github.com/google/uuid"
)

type LeadService interface {
	CreatePublicLead(ctx context.Context, req dto.CreateLeadRequest) (*dto.LeadResponse, error)
	ListAdminLeads(ctx context.Context, query dto.LeadFilterQuery) (*dto.PaginatedLeadsResponse, error)
	GetAdminLeadByID(ctx context.Context, id uuid.UUID) (*dto.LeadResponse, error)
	UpdateAdminLead(ctx context.Context, id uuid.UUID, req dto.UpdateLeadRequest) (*dto.LeadResponse, error)
	DeleteAdminLead(ctx context.Context, id uuid.UUID) error
	GetAdminLeadStats(ctx context.Context) (*dto.LeadStatsResponse, error)
}

type leadService struct {
	repo repository.LeadRepository
}

func NewLeadService(repo repository.LeadRepository) LeadService {
	return &leadService{
		repo: repo,
	}
}

func (s *leadService) CreatePublicLead(ctx context.Context, req dto.CreateLeadRequest) (*dto.LeadResponse, error) {
	fullName := coalesceNonEmpty(req.FullName, req.FullNameSnake)
	if len(fullName) < 2 {
		return nil, utils.NewError("Vui lòng nhập họ và tên hợp lệ", utils.ErrCodeBadRequest)
	}

	phone := strings.TrimSpace(req.Phone)
	if len(phone) < 8 {
		return nil, utils.NewError("Vui lòng nhập số điện thoại hợp lệ", utils.ErrCodeBadRequest)
	}

	serviceType := coalesceNonEmpty(req.ServiceType, req.ServiceTypeSnake)
	if serviceType == "" {
		serviceType = "full_package"
	}

	sourcePage := coalesceNonEmpty(req.SourcePage, req.SourcePageSnake)
	if sourcePage == "" {
		sourcePage = "/"
	}

	estimatedBudget := coalescePtr(req.EstimatedBudget, req.EstimatedBudgetSnake)
	landSize := coalescePtr(req.LandSize, req.LandSizeSnake)

	var refProjectUUID *uuid.UUID
	rawRefID := coalescePtr(req.ReferencedProjectID, req.ReferencedProjectSnake)
	if rawRefID != nil && *rawRefID != "" {
		if parsed, err := uuid.Parse(*rawRefID); err == nil {
			refProjectUUID = &parsed
		}
	}

	created, err := s.repo.Create(ctx, sqlc.CreateConsultationLeadParams{
		FullName:               fullName,
		Phone:                  phone,
		Email:                  req.Email,
		ServiceType:            serviceType,
		EstimatedBudget:        estimatedBudget,
		LandSize:               landSize,
		Location:               req.Location,
		Message:                strings.TrimSpace(req.Message),
		SourcePage:             sourcePage,
		ReferencedProjectID:    refProjectUUID,
		ReferencedProjectTitle: req.ReferencedProjectTitle,
	})
	if err != nil {
		return nil, err
	}

	res := mapLeadToDTO(created)
	return &res, nil
}

func (s *leadService) ListAdminLeads(ctx context.Context, query dto.LeadFilterQuery) (*dto.PaginatedLeadsResponse, error) {
	page := query.Page
	if page <= 0 {
		page = 1
	}
	limit := query.Limit
	if limit <= 0 {
		limit = 50
	}
	if limit > 100 {
		limit = 100
	}
	offset := (page - 1) * limit

	statusPtr := optFilterString(query.Status)
	servicePtr := optFilterString(query.ServiceType)
	searchPtr := optFilterString(query.Search)

	countArg := sqlc.CountConsultationLeadsParams{
		Status:      statusPtr,
		ServiceType: servicePtr,
		Search:      searchPtr,
	}
	listArg := sqlc.ListConsultationLeadsParams{
		Status:      statusPtr,
		ServiceType: servicePtr,
		Search:      searchPtr,
		Limit:       int32(limit),
		Offset:      int32(offset),
	}

	leads, total, err := s.repo.ListWithCount(ctx, listArg, countArg)
	if err != nil {
		return nil, err
	}

	items := make([]dto.LeadResponse, 0, len(leads))
	for i := range leads {
		items = append(items, mapLeadToDTO(&leads[i]))
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	if totalPages < 1 {
		totalPages = 1
	}

	return &dto.PaginatedLeadsResponse{
		Items:      items,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}, nil
}

func (s *leadService) GetAdminLeadByID(ctx context.Context, id uuid.UUID) (*dto.LeadResponse, error) {
	lead, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapLeadToDTO(lead)
	return &res, nil
}

func (s *leadService) UpdateAdminLead(ctx context.Context, id uuid.UUID, req dto.UpdateLeadRequest) (*dto.LeadResponse, error) {
	status := coalescePtr(req.LeadStatus, req.Status)
	notes := coalescePtr(req.InternalNotes, req.InternalNotesSnk)
	assigned := coalescePtr(req.AssignedArchitect, req.AssignedTo)

	updated, err := s.repo.Update(ctx, sqlc.UpdateConsultationLeadParams{
		ID:            id,
		Status:        status,
		InternalNotes: notes,
		AssignedTo:    assigned,
	})
	if err != nil {
		return nil, err
	}

	res := mapLeadToDTO(updated)
	return &res, nil
}

func (s *leadService) DeleteAdminLead(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}

func (s *leadService) GetAdminLeadStats(ctx context.Context) (*dto.LeadStatsResponse, error) {
	rows, err := s.repo.GetStats(ctx)
	if err != nil {
		return nil, err
	}

	stats := &dto.LeadStatsResponse{}
	for _, r := range rows {
		stats.Total += r.Count
		switch r.Status {
		case "pending":
			stats.Pending += r.Count
		case "in_progress", "consulting":
			stats.InProgress += r.Count
		case "scheduled":
			stats.Scheduled += r.Count
		case "won", "contracted":
			stats.Won += r.Count
		case "lost", "cancelled":
			stats.Lost += r.Count
		}
	}
	return stats, nil
}

func mapLeadToDTO(l *sqlc.ConsultationLead) dto.LeadResponse {
	shortID := strings.ToUpper(l.ID.String()[:4])
	code := fmt.Sprintf("#LD-%d-%s", l.CreatedAt.Year(), shortID)

	landSize := "Chưa cung cấp"
	if l.LandSize != nil && strings.TrimSpace(*l.LandSize) != "" {
		landSize = *l.LandSize
	}

	location := "Chưa cung cấp"
	if l.Location != nil && strings.TrimSpace(*l.Location) != "" {
		location = *l.Location
	}

	var refIDStr *string
	if l.ReferencedProjectID != nil {
		s := l.ReferencedProjectID.String()
		refIDStr = &s
	}

	return dto.LeadResponse{
		ID:                     l.ID,
		Code:                   code,
		FullName:               l.FullName,
		Phone:                  l.Phone,
		Email:                  l.Email,
		ServiceType:            l.ServiceType,
		ServiceLabel:           serviceTypeLabel(l.ServiceType),
		EstimatedBudget:        l.EstimatedBudget,
		LandSize:               landSize,
		Location:               location,
		Message:                l.Message,
		SourcePage:             l.SourcePage,
		ReferencedProjectID:    refIDStr,
		ReferencedProjectTitle: l.ReferencedProjectTitle,
		LeadStatus:             l.Status,
		AssignedArchitect:      l.AssignedTo,
		InternalNotes:          l.InternalNotes,
		CreatedAt:              l.CreatedAt.Format("02/01/2006 - 15:04"),
		RelativeTime:           formatVietnameseRelativeTime(l.CreatedAt),
	}
}

func serviceTypeLabel(st string) string {
	switch st {
	case "design":
		return "Thiết kế Kiến trúc & Nội thất"
	case "construction":
		return "Thi công Xây dựng"
	default:
		return "Thiết kế & Thi công trọn gói"
	}
}

func formatVietnameseRelativeTime(t time.Time) string {
	diff := time.Since(t)
	if diff < time.Minute {
		return "Vừa xong"
	}
	if diff < time.Hour {
		return fmt.Sprintf("%d phút trước", int(diff.Minutes()))
	}
	if diff < 24*time.Hour {
		return fmt.Sprintf("%d giờ trước", int(diff.Hours()))
	}
	return fmt.Sprintf("%d ngày trước", int(diff.Hours()/24))
}

func coalesceNonEmpty(a, b string) string {
	if trimmed := strings.TrimSpace(a); trimmed != "" {
		return trimmed
	}
	return strings.TrimSpace(b)
}

func coalescePtr(a, b *string) *string {
	if a != nil {
		return a
	}
	return b
}
