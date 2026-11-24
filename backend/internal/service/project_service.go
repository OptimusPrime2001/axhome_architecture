package service

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/dto"
	"axhome_server/internal/repository"
	"axhome_server/internal/utils"
	"context"
	"encoding/json"
	"fmt"
	"math"
	"strings"
	"time"

	"github.com/google/uuid"
)

type ProjectService interface {
	ListPublicProjects(ctx context.Context, query dto.ProjectListQuery) (*dto.PaginatedProjectsResponse, error)
	GetPublicProjectBySlug(ctx context.Context, slug string) (*dto.ProjectResponse, error)
	ListRelatedProjects(ctx context.Context, slug string, limit int) ([]dto.ProjectResponse, error)
	ListAdminProjects(ctx context.Context, query dto.ProjectListQuery) (*dto.PaginatedProjectsResponse, error)
	GetAdminProjectByID(ctx context.Context, id uuid.UUID) (*dto.ProjectResponse, error)
	CreateProject(ctx context.Context, req dto.SaveProjectRequest) (*dto.ProjectResponse, error)
	UpdateProject(ctx context.Context, id uuid.UUID, req dto.SaveProjectRequest) (*dto.ProjectResponse, error)
	UpdateProjectStatus(ctx context.Context, id uuid.UUID, status string) (*dto.ProjectResponse, error)
	DeleteProject(ctx context.Context, id uuid.UUID) error
}

type projectService struct {
	repo    repository.ProjectRepository
	storage StorageService
}

func NewProjectService(repo repository.ProjectRepository, storage StorageService) ProjectService {
	return &projectService{
		repo:    repo,
		storage: storage,
	}
}

func (s *projectService) ListPublicProjects(ctx context.Context, query dto.ProjectListQuery) (*dto.PaginatedProjectsResponse, error) {
	query.Status = "published"
	return s.listProjects(ctx, query)
}

func (s *projectService) ListAdminProjects(ctx context.Context, query dto.ProjectListQuery) (*dto.PaginatedProjectsResponse, error) {
	return s.listProjects(ctx, query)
}

func (s *projectService) listProjects(ctx context.Context, query dto.ProjectListQuery) (*dto.PaginatedProjectsResponse, error) {
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
	typePtr := optFilterString(query.ProjectType)
	categoryPtr := optFilterString(query.Category)
	stylePtr := optFilterString(query.Style)
	cityPtr := optFilterString(query.City)
	searchPtr := optFilterString(query.Search)

	countArg := sqlc.CountProjectsParams{
		Status:      statusPtr,
		ProjectType: typePtr,
		Category:    categoryPtr,
		Style:       stylePtr,
		City:        cityPtr,
		IsFeatured:  query.Featured,
		Search:      searchPtr,
	}

	listArg := sqlc.ListProjectsParams{
		Status:      statusPtr,
		ProjectType: typePtr,
		Category:    categoryPtr,
		Style:       stylePtr,
		City:        cityPtr,
		IsFeatured:  query.Featured,
		Search:      searchPtr,
		Limit:       int32(limit),
		Offset:      int32(offset),
	}

	bundles, total, err := s.repo.ListBundles(ctx, listArg, countArg)
	if err != nil {
		return nil, err
	}

	items := make([]dto.ProjectResponse, 0, len(bundles))
	for i := range bundles {
		items = append(items, mapProjectBundleToDTO(&bundles[i]))
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	if totalPages < 1 {
		totalPages = 1
	}

	return &dto.PaginatedProjectsResponse{
		Items:      items,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}, nil
}

func (s *projectService) GetPublicProjectBySlug(ctx context.Context, slug string) (*dto.ProjectResponse, error) {
	bundle, err := s.repo.GetBundleBySlug(ctx, strings.TrimSpace(slug))
	if err != nil {
		return nil, err
	}
	if bundle.Project.Status != "published" {
		return nil, utils.NewError(utils.MsgProjectNotFound, utils.ErrCodeNotFound)
	}

	_ = s.repo.IncrementViewCount(ctx, bundle.Project.ID)
	bundle.Project.ViewCount++

	res := mapProjectBundleToDTO(bundle)
	return &res, nil
}

func (s *projectService) ListRelatedProjects(ctx context.Context, slug string, limit int) ([]dto.ProjectResponse, error) {
	if limit <= 0 || limit > 12 {
		limit = 3
	}

	current, err := s.repo.GetBundleBySlug(ctx, strings.TrimSpace(slug))
	if err != nil {
		return nil, err
	}

	bundles, err := s.repo.ListRelatedBundles(ctx, sqlc.ListRelatedProjectsParams{
		Slug:        current.Project.Slug,
		Category:    current.Project.Category,
		Style:       current.Project.Style,
		ProjectType: current.Project.ProjectType,
		Limit:       int32(limit),
	})
	if err != nil {
		return nil, err
	}

	items := make([]dto.ProjectResponse, 0, len(bundles))
	for i := range bundles {
		items = append(items, mapProjectBundleToDTO(&bundles[i]))
	}
	return items, nil
}

func (s *projectService) GetAdminProjectByID(ctx context.Context, id uuid.UUID) (*dto.ProjectResponse, error) {
	bundle, err := s.repo.GetBundleByID(ctx, id)
	if err != nil {
		return nil, err
	}
	res := mapProjectBundleToDTO(bundle)
	return &res, nil
}

func (s *projectService) CreateProject(ctx context.Context, req dto.SaveProjectRequest) (*dto.ProjectResponse, error) {
	slug, err := s.resolveUniqueSlug(ctx, req.Slug, req.Title, nil)
	if err != nil {
		return nil, err
	}

	createArg, images, floorPlans, milestones, err := buildProjectPersistenceArgs(req, slug)
	if err != nil {
		return nil, err
	}

	bundle, err := s.repo.CreateWithChildren(ctx, createArg, images, floorPlans, milestones)
	if err != nil {
		return nil, err
	}

	res := mapProjectBundleToDTO(bundle)
	return &res, nil
}

func (s *projectService) UpdateProject(ctx context.Context, id uuid.UUID, req dto.SaveProjectRequest) (*dto.ProjectResponse, error) {
	var oldURLs []string
	if s.storage != nil {
		if existing, err := s.repo.GetBundleByID(ctx, id); err == nil && existing != nil {
			oldURLs = collectProjectMediaURLs(existing)
		}
	}

	slug, err := s.resolveUniqueSlug(ctx, req.Slug, req.Title, &id)
	if err != nil {
		return nil, err
	}

	createArg, images, floorPlans, milestones, err := buildProjectPersistenceArgs(req, slug)
	if err != nil {
		return nil, err
	}

	updateArg := sqlc.UpdateProjectParams{
		ID:                   id,
		Title:                createArg.Title,
		Slug:                 createArg.Slug,
		ProjectType:          createArg.ProjectType,
		Category:             createArg.Category,
		Style:                createArg.Style,
		Location:             createArg.Location,
		City:                 createArg.City,
		CompletedYear:        createArg.CompletedYear,
		ClientName:           createArg.ClientName,
		LeadArchitect:        createArg.LeadArchitect,
		ConstructionDuration: createArg.ConstructionDuration,
		LandArea:             createArg.LandArea,
		FloorArea:            createArg.FloorArea,
		FacadeWidth:          createArg.FacadeWidth,
		FloorsCount:          createArg.FloorsCount,
		BedroomsCount:        createArg.BedroomsCount,
		Excerpt:              createArg.Excerpt,
		ContentHtml:          createArg.ContentHtml,
		CoverImage:           createArg.CoverImage,
		Highlights:           createArg.Highlights,
		TechnicalChallenges:  createArg.TechnicalChallenges,
		TechnicalSolutions:   createArg.TechnicalSolutions,
		ClientTestimonial:    createArg.ClientTestimonial,
		SeoTitle:             createArg.SeoTitle,
		SeoDescription:       createArg.SeoDescription,
		IsFeatured:           createArg.IsFeatured,
		Status:               createArg.Status,
	}

	bundle, err := s.repo.UpdateWithChildren(ctx, updateArg, images, floorPlans, milestones)
	if err != nil {
		return nil, err
	}

	if s.storage != nil && len(oldURLs) > 0 {
		newURLs := collectProjectMediaURLs(bundle)
		removed := diffRemovedURLs(oldURLs, newURLs)
		if len(removed) > 0 {
			s.storage.DeleteImagesByURLs(ctx, removed)
		}
	}

	res := mapProjectBundleToDTO(bundle)
	return &res, nil
}

func (s *projectService) UpdateProjectStatus(ctx context.Context, id uuid.UUID, status string) (*dto.ProjectResponse, error) {
	bundle, err := s.repo.UpdateStatus(ctx, id, status)
	if err != nil {
		return nil, err
	}
	res := mapProjectBundleToDTO(bundle)
	return &res, nil
}

func (s *projectService) DeleteProject(ctx context.Context, id uuid.UUID) error {
	var oldURLs []string
	if s.storage != nil {
		if existing, err := s.repo.GetBundleByID(ctx, id); err == nil && existing != nil {
			oldURLs = collectProjectMediaURLs(existing)
		}
	}

	if err := s.repo.Delete(ctx, id); err != nil {
		return err
	}

	if s.storage != nil && len(oldURLs) > 0 {
		s.storage.DeleteImagesByURLs(ctx, oldURLs)
	}

	return nil
}

func collectProjectMediaURLs(bundle *repository.ProjectBundle) []string {
	if bundle == nil {
		return nil
	}
	urls := make([]string, 0, 1+len(bundle.Images)+len(bundle.FloorPlans)+len(bundle.Milestones))
	if u := strings.TrimSpace(bundle.Project.CoverImage); u != "" {
		urls = append(urls, u)
	}
	for _, img := range bundle.Images {
		if u := strings.TrimSpace(img.Url); u != "" {
			urls = append(urls, u)
		}
	}
	for _, fp := range bundle.FloorPlans {
		if u := strings.TrimSpace(fp.ImageUrl); u != "" {
			urls = append(urls, u)
		}
	}
	for _, ms := range bundle.Milestones {
		if ms.PhotoUrl != nil {
			if u := strings.TrimSpace(*ms.PhotoUrl); u != "" {
				urls = append(urls, u)
			}
		}
	}
	return urls
}

func diffRemovedURLs(oldURLs, newURLs []string) []string {
	active := make(map[string]struct{}, len(newURLs))
	for _, u := range newURLs {
		active[strings.TrimSpace(u)] = struct{}{}
	}
	removed := make([]string, 0)
	for _, u := range oldURLs {
		trimmed := strings.TrimSpace(u)
		if trimmed == "" {
			continue
		}
		if _, stillUsed := active[trimmed]; !stillUsed {
			removed = append(removed, trimmed)
		}
	}
	return removed
}

func (s *projectService) resolveUniqueSlug(ctx context.Context, rawSlug, title string, excludeID *uuid.UUID) (string, error) {
	baseSlug := utils.Slugify(rawSlug)
	if baseSlug == "" {
		baseSlug = utils.Slugify(title)
	}
	if baseSlug == "" {
		baseSlug = fmt.Sprintf("du-an-%d", time.Now().Unix())
	}

	candidate := baseSlug
	for attempt := 1; attempt <= 20; attempt++ {
		exists, err := s.repo.CheckSlugExists(ctx, candidate, excludeID)
		if err != nil {
			return "", err
		}
		if !exists {
			return candidate, nil
		}
		candidate = fmt.Sprintf("%s-%d", baseSlug, attempt+1)
	}

	return fmt.Sprintf("%s-%d", baseSlug, time.Now().Unix()), nil
}

func buildProjectPersistenceArgs(
	req dto.SaveProjectRequest,
	slug string,
) (
	sqlc.CreateProjectParams,
	[]sqlc.CreateProjectImageParams,
	[]sqlc.CreateFloorPlanParams,
	[]sqlc.CreateProjectMilestoneParams,
	error,
) {
	highlightsJSON := []byte("[]")
	if len(req.Highlights) > 0 {
		b, err := json.Marshal(req.Highlights)
		if err != nil {
			return sqlc.CreateProjectParams{}, nil, nil, nil, utils.NewError("Dữ liệu highlights không hợp lệ", utils.ErrCodeBadRequest)
		}
		highlightsJSON = b
	}

	var testimonialJSON []byte
	if req.ClientTestimonial != nil && strings.TrimSpace(req.ClientTestimonial.Quote) != "" {
		b, err := json.Marshal(req.ClientTestimonial)
		if err != nil {
			return sqlc.CreateProjectParams{}, nil, nil, nil, utils.NewError("Dữ liệu đánh giá khách hàng không hợp lệ", utils.ErrCodeBadRequest)
		}
		testimonialJSON = b
	}

	status := strings.TrimSpace(req.Status)
	if status != "published" && status != "draft" {
		status = "draft"
	}

	floorsCount := req.FloorsCount
	if floorsCount <= 0 {
		floorsCount = 1
	}
	bedroomsCount := req.BedroomsCount
	if bedroomsCount < 0 {
		bedroomsCount = 0
	}

	createArg := sqlc.CreateProjectParams{
		Title:                strings.TrimSpace(req.Title),
		Slug:                 slug,
		ProjectType:          strings.TrimSpace(req.ProjectType),
		Category:             strings.TrimSpace(req.Category),
		Style:                strings.TrimSpace(req.Style),
		Location:             strings.TrimSpace(req.Location),
		City:                 strings.TrimSpace(req.City),
		CompletedYear:        req.CompletedYear,
		ClientName:           req.ClientName,
		LeadArchitect:        strings.TrimSpace(req.LeadArchitect),
		ConstructionDuration: req.ConstructionDuration,
		LandArea:             req.LandArea,
		FloorArea:            req.FloorArea,
		FacadeWidth:          req.FacadeWidth,
		FloorsCount:          floorsCount,
		BedroomsCount:        bedroomsCount,
		Excerpt:              strings.TrimSpace(req.Excerpt),
		ContentHtml:          req.ContentHTML,
		CoverImage:           strings.TrimSpace(req.CoverImage),
		Highlights:           highlightsJSON,
		TechnicalChallenges:  req.TechnicalChallenges,
		TechnicalSolutions:   req.TechnicalSolutions,
		ClientTestimonial:    testimonialJSON,
		SeoTitle:             req.SeoTitle,
		SeoDescription:       req.SeoDescription,
		IsFeatured:           req.IsFeatured,
		Status:               status,
	}

	images := make([]sqlc.CreateProjectImageParams, 0, len(req.Gallery))
	for idx, img := range req.Gallery {
		if strings.TrimSpace(img.URL) == "" {
			continue
		}
		imgType := strings.TrimSpace(img.Type)
		if imgType == "" {
			imgType = "real_photo"
		}
		images = append(images, sqlc.CreateProjectImageParams{
			Url:           strings.TrimSpace(img.URL),
			Caption:       strings.TrimSpace(img.Caption),
			ImageType:     imgType,
			SpaceCategory: img.SpaceCategory,
			IsCover:       img.IsCover,
			SortOrder:     int32(idx),
		})
	}

	floorPlans := make([]sqlc.CreateFloorPlanParams, 0, len(req.FloorPlans))
	for idx, fp := range req.FloorPlans {
		if strings.TrimSpace(fp.ImageURL) == "" {
			continue
		}
		roomsJSON := []byte("[]")
		if len(fp.Rooms) > 0 {
			if b, err := json.Marshal(fp.Rooms); err == nil {
				roomsJSON = b
			}
		}
		floorPlans = append(floorPlans, sqlc.CreateFloorPlanParams{
			Name:             strings.TrimSpace(fp.Name),
			ImageUrl:         strings.TrimSpace(fp.ImageURL),
			AreaSquareMeters: fp.AreaSquareMeters,
			Description:      strings.TrimSpace(fp.Description),
			Rooms:            roomsJSON,
			SortOrder:        int32(idx),
		})
	}

	milestones := make([]sqlc.CreateProjectMilestoneParams, 0, len(req.Milestones))
	for idx, ms := range req.Milestones {
		if strings.TrimSpace(ms.Title) == "" {
			continue
		}
		milestones = append(milestones, sqlc.CreateProjectMilestoneParams{
			Title:       strings.TrimSpace(ms.Title),
			Period:      strings.TrimSpace(ms.Period),
			Description: strings.TrimSpace(ms.Description),
			PhotoUrl:    ms.PhotoURL,
			IsCompleted: ms.IsCompleted,
			SortOrder:   int32(idx),
		})
	}

	return createArg, images, floorPlans, milestones, nil
}

func mapProjectBundleToDTO(b *repository.ProjectBundle) dto.ProjectResponse {
	p := b.Project

	var highlights []dto.ProjectHighlightDTO
	if len(p.Highlights) > 0 {
		_ = json.Unmarshal(p.Highlights, &highlights)
	}

	var testimonial *dto.ClientTestimonialDTO
	if len(p.ClientTestimonial) > 0 {
		var parsed dto.ClientTestimonialDTO
		if err := json.Unmarshal(p.ClientTestimonial, &parsed); err == nil && parsed.Quote != "" {
			testimonial = &parsed
		}
	}

	gallery := make([]dto.ProjectImageDTO, 0, len(b.Images))
	for _, img := range b.Images {
		gallery = append(gallery, dto.ProjectImageDTO{
			ID:            img.ID.String(),
			URL:           img.Url,
			Caption:       img.Caption,
			Type:          img.ImageType,
			SpaceCategory: img.SpaceCategory,
			IsCover:       img.IsCover,
		})
	}

	floorPlans := make([]dto.FloorPlanDTO, 0, len(b.FloorPlans))
	for _, fp := range b.FloorPlans {
		var rooms []string
		if len(fp.Rooms) > 0 {
			_ = json.Unmarshal(fp.Rooms, &rooms)
		}
		floorPlans = append(floorPlans, dto.FloorPlanDTO{
			ID:               fp.ID.String(),
			Name:             fp.Name,
			ImageURL:         fp.ImageUrl,
			Description:      fp.Description,
			AreaSquareMeters: fp.AreaSquareMeters,
			Rooms:            rooms,
		})
	}

	milestones := make([]dto.ProjectMilestoneDTO, 0, len(b.Milestones))
	for _, ms := range b.Milestones {
		milestones = append(milestones, dto.ProjectMilestoneDTO{
			ID:          ms.ID.String(),
			Title:       ms.Title,
			Period:      ms.Period,
			Description: ms.Description,
			PhotoURL:    ms.PhotoUrl,
			IsCompleted: ms.IsCompleted,
		})
	}

	return dto.ProjectResponse{
		ID:                   p.ID,
		Title:                p.Title,
		Slug:                 p.Slug,
		ProjectType:          p.ProjectType,
		Category:             p.Category,
		Style:                p.Style,
		Location:             p.Location,
		City:                 p.City,
		CompletedYear:        p.CompletedYear,
		ClientName:           p.ClientName,
		LeadArchitect:        p.LeadArchitect,
		ConstructionDuration: p.ConstructionDuration,
		LandArea:             p.LandArea,
		FloorArea:            p.FloorArea,
		FloorsCount:          p.FloorsCount,
		BedroomsCount:        p.BedroomsCount,
		FacadeWidth:          p.FacadeWidth,
		Excerpt:              p.Excerpt,
		ContentHTML:          p.ContentHtml,
		Highlights:           highlights,
		TechnicalChallenges:  p.TechnicalChallenges,
		TechnicalSolutions:   p.TechnicalSolutions,
		ClientTestimonial:    testimonial,
		CoverImage:           p.CoverImage,
		Gallery:              gallery,
		FloorPlans:           floorPlans,
		Milestones:           milestones,
		SeoTitle:             p.SeoTitle,
		SeoDescription:       p.SeoDescription,
		IsFeatured:           p.IsFeatured,
		Status:               p.Status,
		ViewCount:            p.ViewCount,
		CreatedAt:            p.CreatedAt.Format("2006-01-02"),
	}
}

func optFilterString(val string) *string {
	trimmed := strings.TrimSpace(val)
	if trimmed == "" || strings.EqualFold(trimmed, "all") {
		return nil
	}
	return &trimmed
}
