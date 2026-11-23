"use client";

import { toast } from "@components";
import { APP_ROUTE } from "@constants";
import { useCurrentAdmin } from "@hooks";
import { ApiError } from "@lib";
import { useAdminAuthStore } from "@store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { AdminSidebar } from "../admin-sidebar";
import { AdminTopbar } from "../admin-topbar";
import styles from "./AdminShell.module.scss";
export interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { setProfileFromDto, setCheckingAuth, setHasCheckedAuth, clearAuth } =
    useAdminAuthStore(
      useShallow((state) => ({
        setProfileFromDto: state.setProfileFromDto,
        setCheckingAuth: state.setCheckingAuth,
        setHasCheckedAuth: state.setHasCheckedAuth,
        clearAuth: state.clearAuth,
      })),
    );

  const { data: currentUser, isLoading, error } = useCurrentAdmin();

  useEffect(() => {
    setCheckingAuth(isLoading);
  }, [isLoading, setCheckingAuth]);

  useEffect(() => {
    if (currentUser) {
      setProfileFromDto(currentUser);
    }
  }, [currentUser, setProfileFromDto]);

  useEffect(() => {
    if (!error) return;
    setHasCheckedAuth(true);

    if (error instanceof ApiError && error.status === 401) {
      clearAuth();
      toast.error("Yêu cầu xác thực", {
        description: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      });
      router.replace(APP_ROUTE.LOGIN_ADMIN);
    }
  }, [error, clearAuth, setHasCheckedAuth, router]);

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
