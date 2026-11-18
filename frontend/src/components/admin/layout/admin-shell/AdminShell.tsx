"use client";

import { useCallback, useState } from "react";
import { AdminSidebar } from "../admin-sidebar";
import { AdminTopbar } from "../admin-topbar";
import styles from "./AdminShell.module.scss";

export interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className={styles.shellWrapper}>
      <AdminSidebar isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <div className={styles.contentColumn}>
        <AdminTopbar onOpenDrawer={handleOpenDrawer} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};
