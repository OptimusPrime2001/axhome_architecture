-- name: CreateUser :one
INSERT INTO users (
    email,
    password_hash,
    full_name,
    role
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 LIMIT 1;

-- name: GetUserById :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: CountUsers :one
SELECT COUNT(*) FROM users;

-- name: CountUsersByRole :one
SELECT COUNT(*) FROM users
WHERE role = $1;

-- name: UpdateUserProfile :one
UPDATE users
SET
    full_name = $2,
    email = $3,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: UpdateUserByAdmin :one
UPDATE users
SET
    full_name = $2,
    email = $3,
    role = $4,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: UpdateUserPassword :exec
UPDATE users
SET 
    password_hash = $2,
    updated_at = NOW()
WHERE id = $1;

-- name: CreateRefreshToken :exec
INSERT INTO refresh_tokens (
    user_id,
    token_hash,
    user_agent,
    ip,
    expires_at
) VALUES (
    $1, $2, $3, $4, $5
);

-- name: GetRefreshTokenByHash :one
SELECT * FROM refresh_tokens
WHERE token_hash = $1 AND revoked_at IS NULL
LIMIT 1;

-- name: RevokeRefreshToken :exec
UPDATE refresh_tokens
SET revoked_at = NOW()
WHERE token_hash = $1 AND revoked_at IS NULL;

-- name: RevokeAllUserRefreshTokens :exec
UPDATE refresh_tokens
SET revoked_at = NOW()
WHERE user_id = $1 AND revoked_at IS NULL;

-- name: DeleteExpiredOrRevokedRefreshTokens :exec
DELETE FROM refresh_tokens
WHERE user_id = $1 AND (revoked_at IS NOT NULL OR expires_at <= NOW());

-- name: DeleteUserRefreshTokensByDevice :exec
DELETE FROM refresh_tokens
WHERE user_id = $1 AND COALESCE(user_agent, '') = COALESCE($2, '');

-- name: DeleteRefreshTokenByHash :exec
DELETE FROM refresh_tokens
WHERE token_hash = $1;

-- name: DeleteAllUserRefreshTokens :exec
DELETE FROM refresh_tokens
WHERE user_id = $1;
