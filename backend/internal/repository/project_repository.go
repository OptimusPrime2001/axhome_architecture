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

type ProjectBundle struct {
	Project    sqlc.Project
	Images     []sqlc.ProjectImage
	FloorPlans []sqlc.FloorPlan
	Milestones []sqlc.ProjectMilestone
}

type ProjectRepository interface {
	CheckSlugExists(ctx context.Context, slug string, excludeID *uuid.UUID) (bool, error)
	CreateWithChildren(
		ctx context.Context,
		arg sqlc.CreateProjectParams,
		images []sqlc.CreateProjectImageParams,
		floorPlans []sqlc.CreateFloorPlanParams,
		milestones []sqlc.CreateProjectMilestoneParams,
	) (*ProjectBundle, error)
	UpdateWithChildren(
		ctx context.Context,
		arg sqlc.UpdateProjectParams,
		images []sqlc.CreateProjectImageParams,
		floorPlans []sqlc.CreateFloorPlanParams,
		milestones []sqlc.CreateProjectMilestoneParams,
	) (*ProjectBundle, error)
	GetBundleByID(ctx context.Context, id uuid.UUID) (*ProjectBundle, error)
	GetBundleBySlug(ctx context.Context, slug string) (*ProjectBundle, error)
	ListBundles(ctx context.Context, listArg sqlc.ListProjectsParams, countArg sqlc.CountProjectsParams) ([]ProjectBundle, int32, error)
	ListRelatedBundles(ctx context.Context, arg sqlc.ListRelatedProjectsParams) ([]ProjectBundle, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status string) (*ProjectBundle, error)
	IncrementViewCount(ctx context.Context, id uuid.UUID) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type projectRepository struct {
	store db.Store
}

func NewProjectRepository(store db.Store) ProjectRepository {
	return &projectRepository{
		store: store,
	}
}

func (r *projectRepository) CheckSlugExists(ctx context.Context, slug string, excludeID *uuid.UUID) (bool, error) {
	return r.store.CheckProjectSlugExists(ctx, sqlc.CheckProjectSlugExistsParams{
		Slug:      slug,
		ExcludeID: excludeID,
	})
}

func (r *projectRepository) CreateWithChildren(
	ctx context.Context,
	arg sqlc.CreateProjectParams,
	images []sqlc.CreateProjectImageParams,
	floorPlans []sqlc.CreateFloorPlanParams,
	milestones []sqlc.CreateProjectMilestoneParams,
) (*ProjectBundle, error) {
	var bundle ProjectBundle

	err := r.store.ExecTx(ctx, func(q sqlc.Querier) error {
		project, err := q.CreateProject(ctx, arg)
		if err != nil {
			var pgErr *pgconn.PgError
			if errors.As(err, &pgErr) && pgErr.Code == "23505" {
				return utils.NewError(utils.MsgProjectSlugExists, utils.ErrCodeConflict)
			}
			return err
		}
		bundle.Project = project

		bundle.Images = make([]sqlc.ProjectImage, 0, len(images))
		for _, img := range images {
			img.ProjectID = project.ID
			createdImg, err := q.CreateProjectImage(ctx, img)
			if err != nil {
				return err
			}
			bundle.Images = append(bundle.Images, createdImg)
		}

		bundle.FloorPlans = make([]sqlc.FloorPlan, 0, len(floorPlans))
		for _, fp := range floorPlans {
			fp.ProjectID = project.ID
			createdFP, err := q.CreateFloorPlan(ctx, fp)
			if err != nil {
				return err
			}
			bundle.FloorPlans = append(bundle.FloorPlans, createdFP)
		}

		bundle.Milestones = make([]sqlc.ProjectMilestone, 0, len(milestones))
		for _, ms := range milestones {
			ms.ProjectID = project.ID
			createdMS, err := q.CreateProjectMilestone(ctx, ms)
			if err != nil {
				return err
			}
			bundle.Milestones = append(bundle.Milestones, createdMS)
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return &bundle, nil
}

func (r *projectRepository) UpdateWithChildren(
	ctx context.Context,
	arg sqlc.UpdateProjectParams,
	images []sqlc.CreateProjectImageParams,
	floorPlans []sqlc.CreateFloorPlanParams,
	milestones []sqlc.CreateProjectMilestoneParams,
) (*ProjectBundle, error) {
	var bundle ProjectBundle

	err := r.store.ExecTx(ctx, func(q sqlc.Querier) error {
		project, err := q.UpdateProject(ctx, arg)
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return utils.NewError(utils.MsgProjectNotFound, utils.ErrCodeNotFound)
			}
			var pgErr *pgconn.PgError
			if errors.As(err, &pgErr) && pgErr.Code == "23505" {
				return utils.NewError(utils.MsgProjectSlugExists, utils.ErrCodeConflict)
			}
			return err
		}
		bundle.Project = project

		if err := q.DeleteProjectImagesByProjectID(ctx, project.ID); err != nil {
			return err
		}
		if err := q.DeleteFloorPlansByProjectID(ctx, project.ID); err != nil {
			return err
		}
		if err := q.DeleteProjectMilestonesByProjectID(ctx, project.ID); err != nil {
			return err
		}

		bundle.Images = make([]sqlc.ProjectImage, 0, len(images))
		for _, img := range images {
			img.ProjectID = project.ID
			createdImg, err := q.CreateProjectImage(ctx, img)
			if err != nil {
				return err
			}
			bundle.Images = append(bundle.Images, createdImg)
		}

		bundle.FloorPlans = make([]sqlc.FloorPlan, 0, len(floorPlans))
		for _, fp := range floorPlans {
			fp.ProjectID = project.ID
			createdFP, err := q.CreateFloorPlan(ctx, fp)
			if err != nil {
				return err
			}
			bundle.FloorPlans = append(bundle.FloorPlans, createdFP)
		}

		bundle.Milestones = make([]sqlc.ProjectMilestone, 0, len(milestones))
		for _, ms := range milestones {
			ms.ProjectID = project.ID
			createdMS, err := q.CreateProjectMilestone(ctx, ms)
			if err != nil {
				return err
			}
			bundle.Milestones = append(bundle.Milestones, createdMS)
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return &bundle, nil
}

func (r *projectRepository) GetBundleByID(ctx context.Context, id uuid.UUID) (*ProjectBundle, error) {
	project, err := r.store.GetProjectByID(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgProjectNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return r.hydrateBundle(ctx, project)
}

func (r *projectRepository) GetBundleBySlug(ctx context.Context, slug string) (*ProjectBundle, error) {
	project, err := r.store.GetProjectBySlug(ctx, slug)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgProjectNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return r.hydrateBundle(ctx, project)
}

func (r *projectRepository) ListBundles(
	ctx context.Context,
	listArg sqlc.ListProjectsParams,
	countArg sqlc.CountProjectsParams,
) ([]ProjectBundle, int32, error) {
	total, err := r.store.CountProjects(ctx, countArg)
	if err != nil {
		return nil, 0, err
	}

	projects, err := r.store.ListProjects(ctx, listArg)
	if err != nil {
		return nil, 0, err
	}

	bundles := make([]ProjectBundle, 0, len(projects))
	for _, p := range projects {
		b, err := r.hydrateBundle(ctx, p)
		if err != nil {
			return nil, 0, err
		}
		bundles = append(bundles, *b)
	}

	return bundles, total, nil
}

func (r *projectRepository) ListRelatedBundles(ctx context.Context, arg sqlc.ListRelatedProjectsParams) ([]ProjectBundle, error) {
	projects, err := r.store.ListRelatedProjects(ctx, arg)
	if err != nil {
		return nil, err
	}

	bundles := make([]ProjectBundle, 0, len(projects))
	for _, p := range projects {
		b, err := r.hydrateBundle(ctx, p)
		if err != nil {
			return nil, err
		}
		bundles = append(bundles, *b)
	}
	return bundles, nil
}

func (r *projectRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status string) (*ProjectBundle, error) {
	project, err := r.store.UpdateProjectStatus(ctx, sqlc.UpdateProjectStatusParams{
		ID:     id,
		Status: status,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, utils.NewError(utils.MsgProjectNotFound, utils.ErrCodeNotFound)
		}
		return nil, err
	}
	return r.hydrateBundle(ctx, project)
}

func (r *projectRepository) IncrementViewCount(ctx context.Context, id uuid.UUID) error {
	return r.store.IncrementProjectViewCount(ctx, id)
}

func (r *projectRepository) Delete(ctx context.Context, id uuid.UUID) error {
	if _, err := r.store.GetProjectByID(ctx, id); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return utils.NewError(utils.MsgProjectNotFound, utils.ErrCodeNotFound)
		}
		return err
	}
	return r.store.DeleteProject(ctx, id)
}

func (r *projectRepository) hydrateBundle(ctx context.Context, p sqlc.Project) (*ProjectBundle, error) {
	images, err := r.store.ListProjectImages(ctx, p.ID)
	if err != nil {
		return nil, err
	}
	floorPlans, err := r.store.ListFloorPlans(ctx, p.ID)
	if err != nil {
		return nil, err
	}
	milestones, err := r.store.ListProjectMilestones(ctx, p.ID)
	if err != nil {
		return nil, err
	}
	return &ProjectBundle{
		Project:    p,
		Images:     images,
		FloorPlans: floorPlans,
		Milestones: milestones,
	}, nil
}
