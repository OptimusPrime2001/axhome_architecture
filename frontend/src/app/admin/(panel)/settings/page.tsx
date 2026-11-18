import { AdminSettingsClient } from "@components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài khoản & Bảo mật",
};

export default function AdminSettingsPage() {
  return <AdminSettingsClient />;
}
