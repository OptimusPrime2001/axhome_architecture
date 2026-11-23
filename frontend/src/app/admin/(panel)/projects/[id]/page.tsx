import { ProjectEditorClient } from "@components/admin";
import type { Metadata } from "next";

export interface AdminEditProjectPageProps {
  params: Promise<{ id: string }>;
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
