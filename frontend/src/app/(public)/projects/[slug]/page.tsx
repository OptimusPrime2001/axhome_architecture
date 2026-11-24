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
import { ProjectDetailTracker } from "@components/sections/project-detail/ProjectDetailTracker";
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

  const seoTitle = project.seoTitle || project.title;
  const seoDescription = project.seoDescription || project.excerpt;
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: `${seoTitle} | ${COMPANY_INFO.brandName}`,
      description: seoDescription,
      images: [project.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} | ${COMPANY_INFO.brandName}`,
      description: seoDescription,
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
      <ProjectDetailTracker
        slug={project.slug}
        title={project.title}
        category={project.category}
      />
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
