import { fetchPublicProjects } from "@apis";
import { Container, Skeleton } from "@components";
import type { Project } from "@shared-types";
import { Suspense } from "react";
import { ProjectsCatalogueClient } from "./ProjectsCatalogueClient";

function ProjectsCatalogueFallback() {
  return (
    <Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
          padding: "48px 0",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Skeleton
            key={key}
            style={{ height: "360px", borderRadius: "12px" }}
          />
        ))}
      </div>
    </Container>
  );
}

export async function ProjectsCatalogue() {
  let publishedProjects: Project[] = [];

  try {
    const res = await fetchPublicProjects({ limit: 100 });
    if (res?.items) {
      publishedProjects = res.items;
    }
  } catch {
    publishedProjects = [];
  }

  return (
    <Suspense fallback={<ProjectsCatalogueFallback />}>
      <ProjectsCatalogueClient projects={publishedProjects} />
    </Suspense>
  );
}
