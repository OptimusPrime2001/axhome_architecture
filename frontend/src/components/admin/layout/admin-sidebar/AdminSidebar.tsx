"use client";

import { toast } from "@components";
import { ADMIN_NAV_ITEMS } from "@constants";
import { useAdminLeads, useAuthLogout } from "@hooks";
import type { AdminNavIconKey } from "@shared-types";
import { adminContactsSelector, useAdminAuthStore } from "@store";
import {
  ExternalLink,
  FolderKanban,
  Globe,
  LayoutGrid,
  LogOut,
  MessageSquareText,
  Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./AdminSidebar.module.scss";

export interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ICONS: Record<AdminNavIconKey, React.ReactNode> = {
  dashboard: <LayoutGrid size={17} aria-hidden="true" />,
  projects: <FolderKanban size={17} aria-hidden="true" />,
  contacts: <MessageSquareText size={17} aria-hidden="true" />,
  accounts: <Users size={17} aria-hidden="true" />,
  settings: <Settings size={17} aria-hidden="true" />,
};

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const profile = useAdminAuthStore((state) => state.profile);
  const { logoutMutation } = useAuthLogout();
  const { data: leadsData } = useAdminLeads({ params: { limit: 100 } });
  const pendingLeadsCount = adminContactsSelector.getPendingCount(
    leadsData?.items ?? [],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Proceed with local redirect even if network fails
    }
    toast.info("Đã đăng xuất khỏi hệ thống quản trị.");
    onClose();
    router.push("/admin/login");
  };

  const sidebarContent = (
    <div className={styles.sidebarInner}>
      {/* Brand Header */}
      <div className={styles.brandHeader}>
        <Link
          href="/admin/dashboard"
          className={styles.brandLink}
          onClick={onClose}
        >
          <div className={styles.logoBox}>
            <Image
              src="/images/axhome_logo.png"
              alt="Axhome Architecture"
              width={36}
              height={24}
              className={styles.logoImage}
              priority
            />
          </div>
          <div className={styles.brandMeta}>
            <span className={styles.brandName}>AXHOME</span>
            <span className={styles.brandSub}>HỆ THỐNG QUẢN TRỊ</span>
          </div>
        </Link>

        <button
          type="button"
          className={styles.mobileCloseBtn}
          onClick={onClose}
          aria-label="Đóng thanh điều hướng"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.navSection} aria-label="Điều hướng quản trị">
        <p className={styles.navGroupTitle}>PHÂN HỆ QUẢN TRỊ</p>
        <ul className={styles.navList}>
          {ADMIN_NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const badgeText =
              item.iconKey === "contacts"
                ? pendingLeadsCount > 0
                  ? `${pendingLeadsCount} Mới`
                  : undefined
                : item.badge;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${active ? styles.active : ""}`}
                  onClick={onClose}
                >
                  <span className={styles.navIcon}>
                    {NAV_ICONS[item.iconKey]}
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {badgeText && (
                    <span
                      className={`${styles.navBadge} ${
                        active ? styles.navBadgeActive : ""
                      }`}
                    >
                      {badgeText}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom User Card */}
      <div className={styles.userFooter}>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.publicSiteBtn}
          onClick={onClose}
        >
          <span className={styles.publicSiteIcon} aria-hidden="true">
            <Globe size={16} />
          </span>
          <span className={styles.publicSiteLabel}>Mở trang Website</span>
          <ExternalLink
            size={14}
            className={styles.publicSiteExternal}
            aria-hidden="true"
          />
        </Link>

        <div className={styles.userCard}>
          <Link
            href="/admin/settings"
            className={styles.userProfileLink}
            onClick={onClose}
            title="Tài khoản của tôi"
          >
            <div className={styles.avatar} aria-hidden="true">
              {profile?.initials ?? "AD"}
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>
                {profile?.name ?? "Quản trị viên"}
              </p>
              <p className={styles.userRole}>
                {profile?.role ?? "Hệ thống quản trị"}
              </p>
            </div>
          </Link>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
            aria-label="Đăng xuất hệ thống"
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className={styles.desktopSidebar} aria-label="Thanh bên quản trị">
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet Responsive Drawer */}
      <div
        className={`${styles.drawerBackdrop} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.mobileDrawer} ${isOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu quản trị"
        aria-hidden={!isOpen}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
