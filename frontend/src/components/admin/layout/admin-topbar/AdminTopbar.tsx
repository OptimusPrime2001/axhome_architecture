"use client";

import { Badge, Input, Menu, toast } from "@components";
import { ADMIN_ROUTE_TITLES } from "@constants";
import { useAdminLeads, useAuthLogout } from "@hooks";
import { useAdminAuthStore } from "@store";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Home,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./AdminTopbar.module.scss";

export interface AdminTopbarProps {
  onOpenDrawer: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onOpenDrawer }) => {
  const pathname = usePathname();
  const router = useRouter();
  const profile = useAdminAuthStore((state) => state.profile);
  const { logoutMutation } = useAuthLogout();
  const { data: leadsData } = useAdminLeads({ params: { limit: 100 } });
  const leads = leadsData?.items ?? [];
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const currentTitle =
    ADMIN_ROUTE_TITLES[pathname] ??
    Object.entries(ADMIN_ROUTE_TITLES).find(([route]) =>
      pathname.startsWith(route),
    )?.[1] ??
    "Quản trị";

  const notifications = leads.slice(0, 5).map((lead) => ({
    id: lead.id,
    title: `Yêu cầu tư vấn mới: ${lead.fullName}`,
    description: `${lead.serviceLabel} — ${lead.location}`,
    timeLabel: lead.relativeTime,
    isUnread: lead.leadStatus === "pending",
    href: "/admin/contacts",
  }));

  const unreadCount = notifications.filter((item) => item.isUnread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotifOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Proceed with local redirect even if network fails
    }
    toast.info("Đã đăng xuất khỏi hệ thống quản trị.");
    setIsUserMenuOpen(false);
    router.push("/admin/login");
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.leftGroup}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onOpenDrawer}
          aria-label="Mở menu quản trị"
        >
          <Menu size={18} />
        </button>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/admin/dashboard" className={styles.breadcrumbRoot}>
            <Home size={14} aria-hidden="true" />
            <span>Hệ thống</span>
          </Link>
          <ChevronRight
            size={14}
            className={styles.breadcrumbSep}
            aria-hidden="true"
          />
          <span className={styles.breadcrumbCurrent}>{currentTitle}</span>
        </nav>
      </div>

      <div className={styles.rightGroup}>
        {/* Quick Search */}
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={15} aria-hidden="true" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nhanh dự án, hồ sơ, khách hàng..."
            aria-label="Tìm kiếm nhanh trong hệ thống quản trị"
            className={styles.searchInput}
          />
        </div>

        {/* Notifications */}
        <div className={styles.popoverAnchor} ref={notifRef}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => {
              setIsNotifOpen((prev) => !prev);
              setIsUserMenuOpen(false);
            }}
            aria-label="Thông báo hệ thống"
            aria-expanded={isNotifOpen}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className={styles.unreadDot} aria-hidden="true" />
            )}
          </button>

          {isNotifOpen && (
            <section
              className={styles.notifPopover}
              aria-label="Danh sách thông báo"
            >
              <div className={styles.popoverHeader}>
                <span className={styles.popoverTitle}>Thông báo</span>
                <Badge variant="pending" showDot={false}>
                  {unreadCount} mới
                </Badge>
              </div>
              <ul className={styles.notifList}>
                {notifications.length === 0 ? (
                  <li className={styles.notifItem}>
                    <p className={styles.notifDesc}>
                      Hiện chưa có yêu cầu tư vấn mới nào.
                    </p>
                  </li>
                ) : (
                  notifications.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`${styles.notifItem} ${
                          item.isUnread ? styles.notifUnread : ""
                        }`}
                        onClick={() => setIsNotifOpen(false)}
                      >
                        <p className={styles.notifTitle}>{item.title}</p>
                        <p className={styles.notifDesc}>{item.description}</p>
                        <span className={styles.notifTime}>
                          {item.timeLabel}
                        </span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </section>
          )}
        </div>

        {/* User Menu */}
        <div className={styles.popoverAnchor} ref={userMenuRef}>
          <button
            type="button"
            className={styles.userTrigger}
            onClick={() => {
              setIsUserMenuOpen((prev) => !prev);
              setIsNotifOpen(false);
            }}
            aria-expanded={isUserMenuOpen}
            aria-label="Tài khoản quản trị"
          >
            <span className={styles.userAvatarBox} aria-hidden="true">
              <User size={15} />
            </span>
            <span className={styles.userMeta}>
              <span className={styles.userTitle}>
                {profile?.accountTitle ?? "Quản trị viên"}
              </span>
              <span className={styles.userPerm}>
                {profile?.permissionLabel ?? "ADMIN"}
              </span>
            </span>
            <ChevronDown
              size={14}
              className={styles.chevronIcon}
              aria-hidden="true"
            />
          </button>

          {isUserMenuOpen && (
            <div className={styles.userDropdown} role="menu">
              <div className={styles.dropdownHeader}>
                <p className={styles.dropdownName}>
                  {profile?.name ?? "Quản trị viên"}
                </p>
                <p className={styles.dropdownEmail}>{profile?.email ?? ""}</p>
              </div>

              <div className={styles.dropdownDivider} />

              <Link
                href="/admin/settings"
                role="menuitem"
                className={styles.dropdownItem}
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings size={15} aria-hidden="true" />
                <span>Tài khoản & Bảo mật</span>
              </Link>

              <Link
                href="/"
                role="menuitem"
                className={styles.dropdownItem}
                onClick={() => setIsUserMenuOpen(false)}
              >
                <ExternalLink size={15} aria-hidden="true" />
                <span>Xem website Public</span>
              </Link>

              <div className={styles.dropdownDivider} />

              <button
                type="button"
                role="menuitem"
                className={`${styles.dropdownItem} ${styles.dropdownDanger}`}
                onClick={handleLogout}
              >
                <LogOut size={15} aria-hidden="true" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
