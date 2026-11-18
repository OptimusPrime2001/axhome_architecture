import { ContactsManagerClient } from "@components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Yêu cầu Tư vấn",
};

export default function AdminContactsPage() {
  return <ContactsManagerClient />;
}
