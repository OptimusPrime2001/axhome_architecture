import {
  ProjectConsultCta,
  ProjectDetailGallery,
  ProjectDetailHero,
  ProjectDetailStory,
  ProjectFloorPlans,
  ProjectMilestones,
  RelatedProjects,
} from "@components";
import { COMPANY_INFO, MOCK_PROJECTS } from "@constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROJECTS.filter((p) => p.status === "published").map(
    (project) => ({
      slug: project.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Không tìm thấy dự án",
    };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} | ${COMPANY_INFO.brandName}`,
      description: project.excerpt,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find(
    (p) => p.slug === slug && p.status === "published",
  );

  if (!project) {
    notFound();
  }

  const relatedProjects = MOCK_PROJECTS.filter(
    (p) => p.id !== project.id && p.status === "published",
  )
    .sort((a, b) => {
      const aMatch =
        Number(a.category === project.category) +
        Number(a.style === project.style);
      const bMatch =
        Number(b.category === project.category) +
        Number(b.style === project.style);
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectDetailStory project={project} />
      <ProjectDetailGallery
        images={project?.gallery}
        projectTitle={project?.title}
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
