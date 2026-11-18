import { ProjectEditorClient } from "@components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thêm dự án mới",
};

export default function AdminCreateProjectPage() {
  return <ProjectEditorClient mode="create" />;
}
