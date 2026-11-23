package main

import (
	"axhome_server/config"
	"axhome_server/internal/app"
	"axhome_server/internal/utils"
	"log"
)

func main() {
	utils.LoadEnv()
	cfg := config.NewConfig()

	application, err := app.NewApplication(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize application: %v", err)
	}

	if err := application.Run(); err != nil {
		log.Fatalf("Application stopped with error: %v", err)
	}
}
