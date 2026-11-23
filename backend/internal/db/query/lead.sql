-- name: CreateConsultationLead :one
INSERT INTO consultation_leads (
    full_name,
    phone,
    email,
    service_type,
    estimated_budget,
    land_size,
    location,
    message,
    source_page,
    referenced_project_id,
    referenced_project_title,
    status
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending'
) RETURNING *;

-- name: GetConsultationLeadByID :one
SELECT * FROM consultation_leads
WHERE id = $1
LIMIT 1;

-- name: CountConsultationLeads :one
SELECT COUNT(*)::int FROM consultation_leads
WHERE (sqlc.narg('status')::text IS NULL OR status = sqlc.narg('status')::text)
  AND (sqlc.narg('service_type')::text IS NULL OR service_type = sqlc.narg('service_type')::text)
  AND (
      sqlc.narg('search')::text IS NULL
      OR full_name ILIKE '%' || sqlc.narg('search')::text || '%'
      OR phone ILIKE '%' || sqlc.narg('search')::text || '%'
      OR COALESCE(email, '') ILIKE '%' || sqlc.narg('search')::text || '%'
      OR COALESCE(location, '') ILIKE '%' || sqlc.narg('search')::text || '%'
  );

-- name: ListConsultationLeads :many
SELECT * FROM consultation_leads
WHERE (sqlc.narg('status')::text IS NULL OR status = sqlc.narg('status')::text)
  AND (sqlc.narg('service_type')::text IS NULL OR service_type = sqlc.narg('service_type')::text)
  AND (
      sqlc.narg('search')::text IS NULL
      OR full_name ILIKE '%' || sqlc.narg('search')::text || '%'
      OR phone ILIKE '%' || sqlc.narg('search')::text || '%'
      OR COALESCE(email, '') ILIKE '%' || sqlc.narg('search')::text || '%'
      OR COALESCE(location, '') ILIKE '%' || sqlc.narg('search')::text || '%'
  )
ORDER BY created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: UpdateConsultationLead :one
UPDATE consultation_leads
SET
    status = COALESCE(sqlc.narg('status')::text, status),
    internal_notes = CASE
        WHEN sqlc.narg('internal_notes')::text IS NOT NULL THEN sqlc.narg('internal_notes')::text
        ELSE internal_notes
    END,
    assigned_to = CASE
        WHEN sqlc.narg('assigned_to')::text IS NOT NULL THEN sqlc.narg('assigned_to')::text
        ELSE assigned_to
    END,
    updated_at = NOW()
WHERE id = sqlc.arg('id')::uuid
RETURNING *;

-- name: DeleteConsultationLead :exec
DELETE FROM consultation_leads
WHERE id = $1;

-- name: GetConsultationLeadStats :many
SELECT status, COUNT(*)::int AS count
FROM consultation_leads
GROUP BY status;
