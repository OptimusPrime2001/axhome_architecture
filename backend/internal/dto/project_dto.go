package dto

import "github.com/google/uuid"

type ProjectHighlightDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type ClientTestimonialDTO struct {
	Author string `json:"author"`
	Role   string `json:"role"`
	Quote  string `json:"quote"`
}

type ProjectImageDTO struct {
	ID            string  `json:"id"`
	URL           string  `json:"url" binding:"required"`
	Caption       string  `json:"caption"`
	Type          string  `json:"type"`
	SpaceCategory *string `json:"spaceCategory,omitempty"`
	IsCover       bool    `json:"isCover,omitempty"`
}

type FloorPlanDTO struct {
	ID               string   `json:"id"`
	Name             string   `json:"name" binding:"required"`
	ImageURL         string   `json:"imageUrl" binding:"required"`
	Description      string   `json:"description"`
	AreaSquareMeters float64  `json:"areaSquareMeters"`
	Rooms            []string `json:"rooms,omitempty"`
}

type ProjectMilestoneDTO struct {
	ID          string  `json:"id"`
	Title       string  `json:"title" binding:"required"`
	Period      string  `json:"period" binding:"required"`
	Description string  `json:"description"`
	PhotoURL    *string `json:"photoUrl,omitempty"`
	IsCompleted bool    `json:"isCompleted"`
}

type SaveProjectRequest struct {
	Title                string                 `json:"title" binding:"required,min=3"`
	Slug                 string                 `json:"slug"`
	ProjectType          string                 `json:"projectType" binding:"required"`
	Category             string                 `json:"category" binding:"required"`
	Style                string                 `json:"style" binding:"required"`
	Location             string                 `json:"location" binding:"required"`
	City                 string                 `json:"city" binding:"required"`
	CompletedYear        int32                  `json:"completedYear" binding:"required"`
	ClientName           *string                `json:"clientName"`
	LeadArchitect        string                 `json:"leadArchitect" binding:"required"`
	ConstructionDuration *string                `json:"constructionDuration"`
	LandArea             float64                `json:"landArea"`
	FloorArea            float64                `json:"floorArea"`
	FloorsCount          int32                  `json:"floorsCount"`
	BedroomsCount        int32                  `json:"bedroomsCount"`
	FacadeWidth          float64                `json:"facadeWidth"`
	Excerpt              string                 `json:"excerpt" binding:"required"`
	ContentHTML          string                 `json:"contentHtml" binding:"required"`
	Highlights           []ProjectHighlightDTO  `json:"highlights"`
	TechnicalChallenges  *string                `json:"technicalChallenges"`
	TechnicalSolutions   *string                `json:"technicalSolutions"`
	ClientTestimonial    *ClientTestimonialDTO  `json:"clientTestimonial"`
	CoverImage           string                 `json:"coverImage" binding:"required"`
	Gallery              []ProjectImageDTO      `json:"gallery"`
	FloorPlans           []FloorPlanDTO         `json:"floorPlans"`
	Milestones           []ProjectMilestoneDTO  `json:"milestones"`
	SeoTitle             *string                `json:"seoTitle"`
	SeoDescription       *string                `json:"seoDescription"`
	IsFeatured           bool                   `json:"isFeatured"`
	Status               string                 `json:"status"`
}

type UpdateProjectStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=draft published"`
}

type ProjectListQuery struct {
	ProjectType string `form:"type"`
	Category    string `form:"category"`
	Style       string `form:"style"`
	City        string `form:"city"`
	Status      string `form:"status"`
	Featured    *bool  `form:"featured"`
	Search      string `form:"search"`
	Page        int    `form:"page"`
	Limit       int    `form:"limit"`
}

type ProjectResponse struct {
	ID                   uuid.UUID              `json:"id"`
	Title                string                 `json:"title"`
	Slug                 string                 `json:"slug"`
	ProjectType          string                 `json:"projectType"`
	Category             string                 `json:"category"`
	Style                string                 `json:"style"`
	Location             string                 `json:"location"`
	City                 string                 `json:"city"`
	CompletedYear        int32                  `json:"completedYear"`
	ClientName           *string                `json:"clientName,omitempty"`
	LeadArchitect        string                 `json:"leadArchitect"`
	ConstructionDuration *string                `json:"constructionDuration,omitempty"`
	LandArea             float64                `json:"landArea"`
	FloorArea            float64                `json:"floorArea"`
	FloorsCount          int32                  `json:"floorsCount"`
	BedroomsCount        int32                  `json:"bedroomsCount"`
	FacadeWidth          float64                `json:"facadeWidth"`
	Excerpt              string                 `json:"excerpt"`
	ContentHTML          string                 `json:"contentHtml"`
	Highlights           []ProjectHighlightDTO  `json:"highlights,omitempty"`
	TechnicalChallenges  *string                `json:"technicalChallenges,omitempty"`
	TechnicalSolutions   *string                `json:"technicalSolutions,omitempty"`
	ClientTestimonial    *ClientTestimonialDTO  `json:"clientTestimonial,omitempty"`
	CoverImage           string                 `json:"coverImage"`
	Gallery              []ProjectImageDTO      `json:"gallery"`
	FloorPlans           []FloorPlanDTO         `json:"floorPlans,omitempty"`
	Milestones           []ProjectMilestoneDTO  `json:"milestones,omitempty"`
	SeoTitle             *string                `json:"seoTitle,omitempty"`
	SeoDescription       *string                `json:"seoDescription,omitempty"`
	IsFeatured           bool                   `json:"isFeatured"`
	Status               string                 `json:"status"`
	ViewCount            int32                  `json:"viewCount"`
	CreatedAt            string                 `json:"createdAt"`
}

type PaginatedProjectsResponse struct {
	Items      []ProjectResponse `json:"items"`
	Total      int32             `json:"total"`
	Page       int               `json:"page"`
	Limit      int               `json:"limit"`
	TotalPages int               `json:"totalPages"`
}
