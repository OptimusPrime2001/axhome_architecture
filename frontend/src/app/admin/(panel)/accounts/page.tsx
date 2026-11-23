import type { Metadata } from "next";
import { AccountsManagerClient } from "@/components/admin/accounts";

export const metadata: Metadata = {
  title: "Quản lý tài khoản | AXHOME Admin",
};

export default function AdminAccountsPage() {
  return <AccountsManagerClient />;
}
