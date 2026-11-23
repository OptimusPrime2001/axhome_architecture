package module

import (
	"axhome_server/internal/db/sqlc"
	"axhome_server/internal/handler"
	"axhome_server/internal/repository"
	"axhome_server/internal/service"

	"github.com/gin-gonic/gin"
)

type LeadModule struct {
	handler *handler.LeadHandler
}

func NewLeadModule(db sqlc.Querier) *LeadModule {
	repo := repository.NewLeadRepository(db)
	svc := service.NewLeadService(repo)
	h := handler.NewLeadHandler(svc)

	return &LeadModule{
		handler: h,
	}
}

func (m *LeadModule) RegisterPublicRoutes(public *gin.RouterGroup) {
	public.POST("/contacts", m.handler.CreatePublicLead)
}

func (m *LeadModule) RegisterPrivateRoutes(private *gin.RouterGroup) {
	contacts := private.Group("/contacts")
	{
		contacts.GET("", m.handler.ListAdminLeads)
		contacts.GET("/stats", m.handler.GetAdminLeadStats)
		contacts.GET("/:id", m.handler.GetAdminLeadByID)
		contacts.PATCH("/:id", m.handler.UpdateAdminLead)
		contacts.DELETE("/:id", m.handler.DeleteAdminLead)
	}
}
