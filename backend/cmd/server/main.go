package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()

	api := router.Group("/api")
	{
		v1 := api.Group("/api/v1")
		{
			public := v1.Group("/public")
			public.GET("/projects", func(ctx *gin.Context) {
				ctx.JSON(http.StatusOK, gin.H{
					"Endpoint": "Lấy danh sách dự án published",
				})
			})

			admin := v1.Group("/admin/auth")
			admin.POST("/lgoin", func(ctx *gin.Context) {

			})
		}
	}

	// authRouter := v1.Group("/admin/auth")

	router.Run(":8080")
}
