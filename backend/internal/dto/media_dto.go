package dto

type UploadMediaResponse struct {
	URL      string `json:"url"`
	Key      string `json:"key"`
	FileName string `json:"fileName"`
	Size     int64  `json:"size"`
	MimeType string `json:"mimeType"`
	Category string `json:"category"`
}

type DeleteMediaRequest struct {
	URL string `json:"url"`
	Key string `json:"key"`
}

type DeleteMediaResponse struct {
	Deleted bool   `json:"deleted"`
	Key     string `json:"key,omitempty"`
}
