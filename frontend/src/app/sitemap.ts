import { fetchPublicProjects } from "@apis";
import { COMPANY_INFO } from "@constants";
import type { MetadataRoute } from "next";
import { isApiConfigured } from "../lib/api-client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = COMPANY_INFO.website.replace(/\/+$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];

  if (isApiConfigured()) {
    try {
      const res = await fetchPublicProjects({ limit: 100 });
      if (res?.items && res.items.length > 0) {
        projectRoutes = res.items.map((project) => ({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: project.createdAt ? new Date(project.createdAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        }));
      }
    } catch {
      // Return static routes if backend API is unavailable during build
    }
  }

  return [...staticRoutes, ...projectRoutes];
}
