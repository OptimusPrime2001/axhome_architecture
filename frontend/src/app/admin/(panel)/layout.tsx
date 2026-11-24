import { AdminShell } from "@components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Quản trị hệ thống",
    template: "%s | Axhome Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
