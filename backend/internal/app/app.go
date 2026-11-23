package app

import (
	"axhome_server/config"
	"axhome_server/internal/db"
	"axhome_server/internal/middleware"
	"axhome_server/internal/module"
	"axhome_server/internal/router"
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog"
	zlog "github.com/rs/zerolog/log"
)

type Application struct {
	config *config.Config
	engine *gin.Engine
	dbPool *pgxpool.Pool
	logger zerolog.Logger
	cancel context.CancelFunc
}

func NewApplication(cfg *config.Config) (*Application, error) {
	logger := middleware.NewLogger(cfg.AppEnv)
	zlog.Logger = logger

	pool, err := db.NewPool(cfg)
	if err != nil {
		return nil, err
	}

	appCtx, cancel := context.WithCancel(context.Background())

	store := db.NewStore(pool)
	if err := db.EnsureSchemaAndSeed(appCtx, pool, store, cfg); err != nil {
		cancel()
		pool.Close()
		return nil, err
	}

	rateLimiter := middleware.NewIPRateLimiter(
		appCtx,
		cfg.RateLimit.RequestsPerSecond,
		cfg.RateLimit.Burst,
		cfg.RateLimit.CleanupInterval,
		cfg.RateLimit.ClientTTL,
	)

	authModule := module.NewAuthModule(store, module.WithAuthConfig(cfg))
	userModule := module.NewUserModule(store)
	projectModule := module.NewProjectModule(store)
	leadModule := module.NewLeadModule(store)
	mediaModule := module.NewMediaModule(cfg.R2)

	engine := router.New(
		&router.Modules{
			Auth:    authModule,
			User:    userModule,
			Project: projectModule,
			Lead:    leadModule,
			Media:   mediaModule,
		},
		&router.Deps{
			Config:      cfg,
			Logger:      logger,
			RateLimiter: rateLimiter,
		},
	)

	return &Application{
		config: cfg,
		engine: engine,
		dbPool: pool,
		logger: logger,
		cancel: cancel,
	}, nil
}

// Run starts the HTTP server and handles graceful shutdown on OS signals.
func (app *Application) Run() error {
	server := &http.Server{
		Addr:              app.config.ServerAddress,
		Handler:           app.engine,
		ReadHeaderTimeout: 10 * time.Second,
	}

	ctx, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
		syscall.SIGINT,
	)
	defer stop()

	go func() {
		app.logger.Info().
			Str("addr", app.config.ServerAddress).
			Str("env", app.config.AppEnv).
			Bool("r2_configured", app.config.R2.IsConfigured()).
			Msg("Gin server started")

		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			app.logger.Fatal().Err(err).Msg("Failed to start HTTP server")
		}
	}()

	<-ctx.Done()
	stop()
	app.logger.Info().Msg("Shutdown signal received. Starting graceful shutdown...")

	if app.cancel != nil {
		app.cancel()
	}

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		return err
	}

	if app.dbPool != nil {
		app.dbPool.Close()
		app.logger.Info().Msg("PostgreSQL connection pool closed")
	}

	app.logger.Info().Msg("Gin server stopped cleanly")
	return nil
}
