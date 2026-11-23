package dto

import "github.com/google/uuid"

type CreateLeadRequest struct {
	FullName               string  `json:"fullName"`
	FullNameSnake          string  `json:"full_name"`
	Phone                  string  `json:"phone" binding:"required"`
	Email                  *string `json:"email"`
	ServiceType            string  `json:"serviceType"`
	ServiceTypeSnake       string  `json:"service_type"`
	EstimatedBudget        *string `json:"estimatedBudget"`
	EstimatedBudgetSnake   *string `json:"estimated_budget"`
	LandSize               *string `json:"landSize"`
	LandSizeSnake          *string `json:"land_size"`
	Location               *string `json:"location"`
	Message                string  `json:"message"`
	SourcePage             string  `json:"sourcePage"`
	SourcePageSnake        string  `json:"source_page"`
	ReferencedProjectID    *string `json:"referencedProjectId"`
	ReferencedProjectSnake *string `json:"referenced_project_id"`
	ReferencedProjectTitle *string `json:"referencedProjectTitle"`
}

type UpdateLeadRequest struct {
	Status            *string `json:"status"`
	LeadStatus        *string `json:"leadStatus"`
	InternalNotes     *string `json:"internalNotes"`
	InternalNotesSnk  *string `json:"internal_notes"`
	AssignedArchitect *string `json:"assignedArchitect"`
	AssignedTo        *string `json:"assigned_to"`
}

type LeadFilterQuery struct {
	Status      string `form:"status"`
	ServiceType string `form:"service_type"`
	Search      string `form:"search"`
	Page        int    `form:"page"`
	Limit       int    `form:"limit"`
}

type LeadResponse struct {
	ID                     uuid.UUID `json:"id"`
	Code                   string    `json:"code"`
	FullName               string    `json:"fullName"`
	Phone                  string    `json:"phone"`
	Email                  *string   `json:"email,omitempty"`
	ServiceType            string    `json:"serviceType"`
	ServiceLabel           string    `json:"serviceLabel"`
	EstimatedBudget        *string   `json:"estimatedBudget,omitempty"`
	LandSize               string    `json:"landSize"`
	Location               string    `json:"location"`
	Message                string    `json:"message"`
	SourcePage             string    `json:"sourcePage"`
	ReferencedProjectID    *string   `json:"referencedProjectId,omitempty"`
	ReferencedProjectTitle *string   `json:"referencedProjectTitle,omitempty"`
	LeadStatus             string    `json:"leadStatus"`
	AssignedArchitect      *string   `json:"assignedArchitect,omitempty"`
	InternalNotes          *string   `json:"internalNotes,omitempty"`
	CreatedAt              string    `json:"createdAt"`
	RelativeTime           string    `json:"relativeTime"`
}

type PaginatedLeadsResponse struct {
	Items      []LeadResponse `json:"items"`
	Total      int32          `json:"total"`
	Page       int            `json:"page"`
	Limit      int            `json:"limit"`
	TotalPages int            `json:"totalPages"`
}

type LeadStatsResponse struct {
	Total      int32 `json:"total"`
	Pending    int32 `json:"pending"`
	InProgress int32 `json:"inProgress"`
	Scheduled  int32 `json:"scheduled"`
	Won        int32 `json:"won"`
	Lost       int32 `json:"lost"`
}
