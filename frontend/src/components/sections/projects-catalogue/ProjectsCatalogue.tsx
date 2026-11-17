import { MOCK_PROJECTS } from "@constants";
import type React from "react";
import { Suspense } from "react";
import { ProjectsCatalogueClient } from "./ProjectsCatalogueClient";

export const ProjectsCatalogue: React.FC = () => {
  const publishedProjects = MOCK_PROJECTS.filter(
    (project) => project.status === "published",
  );

  return (
    <Suspense fallback={null}>
      <ProjectsCatalogueClient projects={publishedProjects} />
    </Suspense>
  );
};
