include .env
export 


MIGRATION_PATH=internal/db/migration
DB_URL = postgres://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=$(DB_SSLMODE)
dev:
	air
# 1. Tạo cặp file migration mới (.up.sql và .down.sql)
# Cách dùng: make migrate-create name=add_avatar_to_users
migrate-create:
	migrate create -ext sql -dir $(MIGRATION_PATH) -seq $(name)

# 2. Chạy toàn bộ migration mới lên DB
migrate-up:
	migrate -path $(MIGRATION_PATH) -database "$(DB_URL)" -verbose up

# 3. Rollback lại 1 bước migration gần nhất
migrate-down:
	migrate -path $(MIGRATION_PATH) -database "$(DB_URL)" -verbose down 1

# 4. Sinh code Go từ sqlc
sqlc:
	sqlc generate

.PHONY: migrate-create migrate-up migrate-down sqlc dev