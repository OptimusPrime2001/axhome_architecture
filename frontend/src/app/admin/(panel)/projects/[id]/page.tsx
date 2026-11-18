import { ProjectEditorClient } from "@components/admin";
import { MOCK_PROJECTS } from "@constants";
import type { Metadata } from "next";

export interface AdminEditProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export const metadata: Metadata = {
  title: "Biên tập hồ sơ dự án",
};

export default async function AdminEditProjectPage({
  params,
}: AdminEditProjectPageProps) {
  const { id } = await params;

  return <ProjectEditorClient mode="edit" projectId={id} />;
}
