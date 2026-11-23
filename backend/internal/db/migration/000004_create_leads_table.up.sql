CREATE TABLE IF NOT EXISTS consultation_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(150),
    service_type VARCHAR(50) NOT NULL,
    estimated_budget VARCHAR(50),
    land_size VARCHAR(100),
    location VARCHAR(255),
    message TEXT NOT NULL DEFAULT '',
    source_page VARCHAR(255) NOT NULL DEFAULT '/',
    referenced_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    referenced_project_title VARCHAR(255),
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    internal_notes TEXT,
    assigned_to VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_consultation_leads_status ON consultation_leads(status);
CREATE INDEX IF NOT EXISTS idx_consultation_leads_created_at ON consultation_leads(created_at DESC);
