package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	// Không cần os.Getwd(), godotenv.Load() mặc định tìm file ".env" ở root
	if err := godotenv.Load(); err != nil {
		// Chỉ log cảnh báo thay vì log.Fatal để không sập app trên Production
		log.Println("⚠️ Không tìm thấy file .env, hệ thống sẽ dùng biến môi trường mặc định của OS")
		return
	}
	log.Println("✅ Load file .env thành công")
}

func Getenv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
func MustGetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("❌ Thiếu biến môi trường bắt buộc: %s", key)
	}
	return val
}
