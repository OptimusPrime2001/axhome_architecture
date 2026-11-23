package config

import (
	"axhome_server/internal/utils"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type DatabaseConfig struct {
	URL      string
	Host     string
	Port     string
	Username string
	Password string
	DBName   string
	SSLMode  string
}

type JWTConfig struct {
	Secret          string
	AccessTokenTTL  time.Duration
	RefreshTokenTTL time.Duration
}

type CORSConfig struct {
	AllowedOrigins []string
}

type RateLimitConfig struct {
	RequestsPerSecond float64
	Burst             int
	CleanupInterval   time.Duration
	ClientTTL         time.Duration
}

type BodyLimitConfig struct {
	DefaultBytes int64
	UploadBytes  int64
}

type R2Config struct {
	AccountID       string
	AccessKeyID     string
	SecretAccessKey string
	BucketName      string
	Endpoint        string
	PublicBaseURL   string
}

func (r R2Config) IsConfigured() bool {
	return r.AccessKeyID != "" && r.SecretAccessKey != "" && r.BucketName != "" && (r.Endpoint != "" || r.AccountID != "")
}

func (r R2Config) ResolvedEndpoint() string {
	if r.Endpoint != "" {
		return strings.TrimRight(r.Endpoint, "/")
	}
	if r.AccountID != "" {
		return fmt.Sprintf("https://%s.r2.cloudflarestorage.com", r.AccountID)
	}
	return ""
}

type AdminSeedConfig struct {
	Email    string
	Password string
	FullName string
}

type Config struct {
	AppEnv        string
	ServerAddress string
	Database      DatabaseConfig
	JWT           JWTConfig
	CORS          CORSConfig
	RateLimit     RateLimitConfig
	BodyLimit     BodyLimitConfig
	R2            R2Config
	AdminSeed     AdminSeedConfig
}

func NewConfig() *Config {
	jwtHours := parseIntEnv("JWT_EXPIRES_IN", 24)
	refreshDays := parseIntEnv("JWT_REFRESH_DAYS", 7)

	serverAddr := utils.Getenv("SERVER_ADDRESS", "")
	if serverAddr == "" {
		if port := utils.Getenv("PORT", ""); port != "" {
			serverAddr = ":" + strings.TrimPrefix(port, ":")
		} else {
			serverAddr = ":8080"
		}
	}

	dbURL := utils.Getenv("DATABASE_URL", "")
	var dbCfg DatabaseConfig
	if dbURL != "" {
		dbCfg = DatabaseConfig{
			URL:     dbURL,
			DBName:  utils.Getenv("DB_NAME", "production"),
			SSLMode: utils.Getenv("DB_SSLMODE", "require"),
		}
	} else {
		dbCfg = DatabaseConfig{
			Host:     utils.MustGetEnv("DB_HOST"),
			Port:     utils.MustGetEnv("DB_PORT"),
			Username: utils.MustGetEnv("DB_USER"),
			Password: utils.MustGetEnv("DB_PASSWORD"),
			DBName:   utils.MustGetEnv("DB_NAME"),
			SSLMode:  utils.MustGetEnv("DB_SSLMODE"),
		}
	}

	return &Config{
		AppEnv:        utils.Getenv("APP_ENV", "development"),
		ServerAddress: serverAddr,
		Database:      dbCfg,
		JWT: JWTConfig{
			Secret:          utils.MustGetEnv("JWT_SECRET"),
			AccessTokenTTL:  time.Duration(jwtHours) * time.Hour,
			RefreshTokenTTL: time.Duration(refreshDays) * 24 * time.Hour,
		},
		CORS: CORSConfig{
			AllowedOrigins: parseCSVEnv("CORS_ALLOWED_ORIGINS", []string{
				"http://localhost:3000",
				"http://127.0.0.1:3000",
			}),
		},
		RateLimit: RateLimitConfig{
			RequestsPerSecond: parseFloatEnv("RATE_LIMIT_RPS", 10),
			Burst:             parseIntEnv("RATE_LIMIT_BURST", 20),
			CleanupInterval:   1 * time.Minute,
			ClientTTL:         5 * time.Minute,
		},
		BodyLimit: BodyLimitConfig{
			DefaultBytes: parseInt64Env("BODY_LIMIT_DEFAULT_BYTES", 2<<20), // 2MB
			UploadBytes:  parseInt64Env("BODY_LIMIT_UPLOAD_BYTES", 16<<20), // 16MB
		},
		R2: R2Config{
			AccountID:       utils.Getenv("R2_ACCOUNT_ID", ""),
			AccessKeyID:     utils.Getenv("R2_ACCESS_KEY_ID", ""),
			SecretAccessKey: utils.Getenv("R2_SECRET_ACCESS_KEY", ""),
			BucketName:      utils.Getenv("R2_BUCKET_NAME", "axhome-media"),
			Endpoint:        utils.Getenv("R2_ENDPOINT", ""),
			PublicBaseURL:   utils.Getenv("R2_PUBLIC_BASE_URL", ""),
		},
		AdminSeed: AdminSeedConfig{
			Email:    utils.Getenv("ADMIN_EMAIL", "axhome@gmail.com"),
			Password: utils.Getenv("ADMIN_PASSWORD", "axhome632001@"),
			FullName: utils.Getenv("ADMIN_FULL_NAME", "Huy Hùng Admin"),
		},
	}
}

func (c *Config) GetConnectDb() string {
	if c.Database.URL != "" {
		return c.Database.URL
	}
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		c.Database.Host,
		c.Database.Port,
		c.Database.Username,
		c.Database.Password,
		c.Database.DBName,
		c.Database.SSLMode,
	)
}

func parseCSVEnv(key string, fallback []string) []string {
	raw := utils.Getenv(key, "")
	if raw == "" {
		return fallback
	}
	parts := strings.Split(raw, ",")
	result := make([]string, 0, len(parts))
	for _, p := range parts {
		if trimmed := strings.TrimSpace(p); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	if len(result) == 0 {
		return fallback
	}
	return result
}

func parseIntEnv(key string, fallback int) int {
	raw := utils.Getenv(key, "")
	if raw == "" {
		return fallback
	}
	val, err := strconv.Atoi(raw)
	if err != nil || val <= 0 {
		return fallback
	}
	return val
}

func parseInt64Env(key string, fallback int64) int64 {
	raw := utils.Getenv(key, "")
	if raw == "" {
		return fallback
	}
	val, err := strconv.ParseInt(raw, 10, 64)
	if err != nil || val <= 0 {
		return fallback
	}
	return val
}

func parseFloatEnv(key string, fallback float64) float64 {
	raw := utils.Getenv(key, "")
	if raw == "" {
		return fallback
	}
	val, err := strconv.ParseFloat(raw, 64)
	if err != nil || val <= 0 {
		return fallback
	}
	return val
}
