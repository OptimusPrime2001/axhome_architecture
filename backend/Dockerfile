# ==============================================================================
# Stage 1: Build Go Binary
# ==============================================================================
FROM golang:1.26-alpine AS builder

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o /app/axhome-server ./cmd/server

# ==============================================================================
# Stage 2: Minimal Production Runtime (~15MB)
# ==============================================================================
FROM alpine:3.21

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata && \
    adduser -D -H -u 10001 appuser

COPY --from=builder /app/axhome-server /app/axhome-server

RUN mkdir -p /app/uploads && chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

CMD ["/app/axhome-server"]
