package service

import (
	"axhome_server/config"
	"testing"
)

func TestResolveMediaFolder(t *testing.T) {
	cases := []struct {
		category string
		want     string
	}{
		{"cover", "projects/cover"},
		{"project-cover", "projects/cover"},
		{"gallery", "projects/gallery"},
		{"project-gallery", "projects/gallery"},
		{"floor-plan", "projects/floor-plan"},
		{"floorplan", "projects/floor-plan"},
		{"milestone", "projects/milestone"},
		{"project-milestone", "projects/milestone"},
		{"project", "projects"},
		{"projects", "projects"},
		{"banner", "banner"},
		{"banners", "banner"},
		{"avatar", "avatar"},
		{"avatars", "avatar"},
		{"", "general"},
		{"unknown-type", "general"},
	}

	for _, tc := range cases {
		if got := resolveMediaFolder(tc.category); got != tc.want {
			t.Errorf("resolveMediaFolder(%q) = %q, want %q", tc.category, got, tc.want)
		}
	}
}

func TestExtractObjectKey(t *testing.T) {
	svc := &storageService{
		r2Cfg: config.R2Config{
			AccountID:     "acc123",
			BucketName:    "axhome-media",
			PublicBaseURL: "https://media.axhome.vn",
		},
	}

	cases := []struct {
		name    string
		input   string
		wantKey string
		wantOK  bool
	}{
		{
			name:    "R2 public URL in projects/cover",
			input:   "https://media.axhome.vn/projects/cover/17000-abc-villa.webp",
			wantKey: "projects/cover/17000-abc-villa.webp",
			wantOK:  true,
		},
		{
			name:    "R2 public URL in banner",
			input:   "https://media.axhome.vn/banner/hero-01.webp",
			wantKey: "banner/hero-01.webp",
			wantOK:  true,
		},
		{
			name:    "R2 public URL in avatar",
			input:   "https://media.axhome.vn/avatar/admin.webp",
			wantKey: "avatar/admin.webp",
			wantOK:  true,
		},
		{
			name:    "Legacy axhome URL still allowed for backward-compatible deletion",
			input:   "https://media.axhome.vn/axhome/gallery/17000-old.webp",
			wantKey: "axhome/gallery/17000-old.webp",
			wantOK:  true,
		},
		{
			name:    "Local dev uploads URL",
			input:   "http://localhost:8080/uploads/projects/gallery/17000-abc-img.webp",
			wantKey: "projects/gallery/17000-abc-img.webp",
			wantOK:  true,
		},
		{
			name:    "Direct managed key",
			input:   "projects/floor-plan/17000-abc-plan.webp",
			wantKey: "projects/floor-plan/17000-abc-plan.webp",
			wantOK:  true,
		},
		{
			name:    "External URL ignored",
			input:   "https://images.unsplash.com/photo-12345",
			wantKey: "",
			wantOK:  false,
		},
		{
			name:    "Path traversal rejected",
			input:   "projects/cover/../../secret.txt",
			wantKey: "",
			wantOK:  false,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			gotKey, gotOK := svc.extractObjectKey(tc.input)
			if gotOK != tc.wantOK || gotKey != tc.wantKey {
				t.Errorf("extractObjectKey(%q) = (%q, %v), want (%q, %v)", tc.input, gotKey, gotOK, tc.wantKey, tc.wantOK)
			}
		})
	}
}
