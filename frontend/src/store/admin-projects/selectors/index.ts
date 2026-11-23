import type { AdminProjectFilterState, Project } from "@shared-types";

export const adminProjectsSelector = {
  filterProjects: (projects: Project[], filters: AdminProjectFilterState) => {
    const query = filters.search.trim().toLowerCase();

    return projects.filter((project) => {
      if (
        filters.projectType !== "all" &&
        project.projectType !== filters.projectType
      ) {
        return false;
      }
      if (filters.category !== "all" && project.category !== filters.category) {
        return false;
      }
      if (filters.style !== "all" && project.style !== filters.style) {
        return false;
      }
      if (filters.status !== "all" && project.status !== filters.status) {
        return false;
      }
      if (query) {
        const code = `ax-${project.id.replace(/\D/g, "").padStart(2, "0")}`;
        const haystack = [
          project.title,
          project.id,
          code,
          project.location,
          project.city,
          project.leadArchitect,
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(query)) {
          return false;
        }
      }
      return true;
    });
  },
};
