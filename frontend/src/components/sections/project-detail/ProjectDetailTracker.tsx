"use client";

import { trackViewProject } from "@lib/analytics";
import { useEffect } from "react";

interface ProjectDetailTrackerProps {
  slug: string;
  title: string;
  category: string;
}

export function ProjectDetailTracker({
  slug,
  title,
  category,
}: ProjectDetailTrackerProps) {
  useEffect(() => {
    trackViewProject({ slug, title, category });
  }, [slug, title, category]);

  return null;
}
