import { AdminProjectsView } from "@components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý dự án",
};

export default function AdminProjectsPage() {
  return <AdminProjectsView />;
}
