import { fetchPublicProjectBySlug, fetchRelatedProjects } from "@apis";
import {
  ProjectConsultCta,
  ProjectDetailGallery,
  ProjectDetailHero,
  ProjectDetailJsonLd,
  ProjectDetailStory,
  ProjectFloorPlans,
  ProjectMilestones,
  RelatedProjects,
} from "@components";
import { COMPANY_INFO } from "@constants";
import type { Project } from "@shared-types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function resolvePublicProject(slug: string): Promise<Project | null> {
  try {
    return await fetchPublicProjectBySlug(slug);
  } catch {
    return null;
  }
}

async function resolveRelatedProjects(project: Project): Promise<Project[]> {
  try {
    const items = await fetchRelatedProjects(project.slug, 3);
    return items ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolvePublicProject(slug);

  if (!project) {
    return {
      title: "Không tìm thấy dự án",
    };
  }

  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.excerpt,
    openGraph: {
      title: `${project.seoTitle || project.title} | ${COMPANY_INFO.brandName}`,
      description: project.seoDescription || project.excerpt,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await resolvePublicProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await resolveRelatedProjects(project);

  return (
    <>
      <ProjectDetailJsonLd project={project} />
      <ProjectDetailHero project={project} />
      <ProjectDetailStory project={project} />
      <ProjectDetailGallery
        images={project.gallery}
        projectTitle={project.title}
      />

      {project.floorPlans && project.floorPlans.length > 0 && (
        <ProjectFloorPlans floorPlans={project.floorPlans} />
      )}

      {project.milestones && project.milestones.length > 0 && (
        <ProjectMilestones milestones={project.milestones} />
      )}

      <RelatedProjects projects={relatedProjects} />
      <ProjectConsultCta projectTitle={project.title} />
    </>
  );
}
