-- name: CreateProject :one
INSERT INTO projects (
    title,
    slug,
    project_type,
    category,
    style,
    location,
    city,
    completed_year,
    client_name,
    lead_architect,
    construction_duration,
    land_area,
    floor_area,
    facade_width,
    floors_count,
    bedrooms_count,
    excerpt,
    content_html,
    cover_image,
    highlights,
    technical_challenges,
    technical_solutions,
    client_testimonial,
    seo_title,
    seo_description,
    is_featured,
    status
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
    $21, $22, $23, $24, $25, $26, $27
) RETURNING *;

-- name: UpdateProject :one
UPDATE projects
SET
    title = $2,
    slug = $3,
    project_type = $4,
    category = $5,
    style = $6,
    location = $7,
    city = $8,
    completed_year = $9,
    client_name = $10,
    lead_architect = $11,
    construction_duration = $12,
    land_area = $13,
    floor_area = $14,
    facade_width = $15,
    floors_count = $16,
    bedrooms_count = $17,
    excerpt = $18,
    content_html = $19,
    cover_image = $20,
    highlights = $21,
    technical_challenges = $22,
    technical_solutions = $23,
    client_testimonial = $24,
    seo_title = $25,
    seo_description = $26,
    is_featured = $27,
    status = $28,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: UpdateProjectStatus :one
UPDATE projects
SET
    status = $2,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: IncrementProjectViewCount :exec
UPDATE projects
SET view_count = view_count + 1
WHERE id = $1;

-- name: DeleteProject :exec
DELETE FROM projects
WHERE id = $1;

-- name: GetProjectByID :one
SELECT * FROM projects
WHERE id = $1
LIMIT 1;

-- name: GetProjectBySlug :one
SELECT * FROM projects
WHERE slug = $1
LIMIT 1;

-- name: CheckProjectSlugExists :one
SELECT EXISTS(
    SELECT 1 FROM projects
    WHERE slug = sqlc.arg('slug')::text
      AND (sqlc.narg('exclude_id')::uuid IS NULL OR id != sqlc.narg('exclude_id')::uuid)
);

-- name: CountProjects :one
SELECT COUNT(*)::int FROM projects
WHERE (sqlc.narg('status')::text IS NULL OR status = sqlc.narg('status')::text)
  AND (sqlc.narg('project_type')::text IS NULL OR project_type = sqlc.narg('project_type')::text)
  AND (sqlc.narg('category')::text IS NULL OR category = sqlc.narg('category')::text)
  AND (sqlc.narg('style')::text IS NULL OR style = sqlc.narg('style')::text)
  AND (sqlc.narg('city')::text IS NULL OR city = sqlc.narg('city')::text)
  AND (sqlc.narg('is_featured')::boolean IS NULL OR is_featured = sqlc.narg('is_featured')::boolean)
  AND (
      sqlc.narg('search')::text IS NULL
      OR title ILIKE '%' || sqlc.narg('search')::text || '%'
      OR location ILIKE '%' || sqlc.narg('search')::text || '%'
      OR city ILIKE '%' || sqlc.narg('search')::text || '%'
      OR lead_architect ILIKE '%' || sqlc.narg('search')::text || '%'
  );

-- name: ListProjects :many
SELECT * FROM projects
WHERE (sqlc.narg('status')::text IS NULL OR status = sqlc.narg('status')::text)
  AND (sqlc.narg('project_type')::text IS NULL OR project_type = sqlc.narg('project_type')::text)
  AND (sqlc.narg('category')::text IS NULL OR category = sqlc.narg('category')::text)
  AND (sqlc.narg('style')::text IS NULL OR style = sqlc.narg('style')::text)
  AND (sqlc.narg('city')::text IS NULL OR city = sqlc.narg('city')::text)
  AND (sqlc.narg('is_featured')::boolean IS NULL OR is_featured = sqlc.narg('is_featured')::boolean)
  AND (
      sqlc.narg('search')::text IS NULL
      OR title ILIKE '%' || sqlc.narg('search')::text || '%'
      OR location ILIKE '%' || sqlc.narg('search')::text || '%'
      OR city ILIKE '%' || sqlc.narg('search')::text || '%'
      OR lead_architect ILIKE '%' || sqlc.narg('search')::text || '%'
  )
ORDER BY is_featured DESC, created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: ListRelatedProjects :many
SELECT * FROM projects
WHERE status = 'published'
  AND slug != $1
  AND (category = $2 OR style = $3 OR project_type = $4)
ORDER BY is_featured DESC, created_at DESC
LIMIT $5;

-- name: CreateProjectImage :one
INSERT INTO project_images (
    project_id,
    url,
    caption,
    image_type,
    space_category,
    is_cover,
    sort_order
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: ListProjectImages :many
SELECT * FROM project_images
WHERE project_id = $1
ORDER BY sort_order ASC, created_at ASC;

-- name: DeleteProjectImagesByProjectID :exec
DELETE FROM project_images
WHERE project_id = $1;

-- name: CreateFloorPlan :one
INSERT INTO floor_plans (
    project_id,
    name,
    image_url,
    area_square_meters,
    description,
    rooms,
    sort_order
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: ListFloorPlans :many
SELECT * FROM floor_plans
WHERE project_id = $1
ORDER BY sort_order ASC, created_at ASC;

-- name: DeleteFloorPlansByProjectID :exec
DELETE FROM floor_plans
WHERE project_id = $1;

-- name: CreateProjectMilestone :one
INSERT INTO project_milestones (
    project_id,
    title,
    period,
    description,
    photo_url,
    is_completed,
    sort_order
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: ListProjectMilestones :many
SELECT * FROM project_milestones
WHERE project_id = $1
ORDER BY sort_order ASC, created_at ASC;

-- name: DeleteProjectMilestonesByProjectID :exec
DELETE FROM project_milestones
WHERE project_id = $1;
