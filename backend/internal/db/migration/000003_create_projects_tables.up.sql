CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    project_type VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    style VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    completed_year INT NOT NULL,
    client_name VARCHAR(150),
    lead_architect VARCHAR(150) NOT NULL,
    construction_duration VARCHAR(100),

    land_area DOUBLE PRECISION NOT NULL DEFAULT 0,
    floor_area DOUBLE PRECISION NOT NULL DEFAULT 0,
    facade_width DOUBLE PRECISION NOT NULL DEFAULT 0,
    floors_count INT NOT NULL DEFAULT 1,
    bedrooms_count INT NOT NULL DEFAULT 1,

    excerpt TEXT NOT NULL,
    content_html TEXT NOT NULL,
    cover_image VARCHAR(500) NOT NULL,

    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    technical_challenges TEXT,
    technical_solutions TEXT,
    client_testimonial JSONB,

    seo_title VARCHAR(255),
    seo_description TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(30) NOT NULL DEFAULT 'draft',
    view_count INT NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status_type ON projects(status, project_type);
CREATE INDEX IF NOT EXISTS idx_projects_category_style ON projects(category, style);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    caption VARCHAR(255) NOT NULL DEFAULT '',
    image_type VARCHAR(50) NOT NULL DEFAULT 'real_photo',
    space_category VARCHAR(50),
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id, sort_order ASC);

CREATE TABLE IF NOT EXISTS floor_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    area_square_meters DOUBLE PRECISION NOT NULL DEFAULT 0,
    description TEXT NOT NULL DEFAULT '',
    rooms JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_floor_plans_project_id ON floor_plans(project_id, sort_order ASC);

CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    period VARCHAR(100) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    photo_url VARCHAR(500),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON project_milestones(project_id, sort_order ASC);
