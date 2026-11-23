"use client";

import {
  MOBILE_BOTTOM_NAV_ITEMS,
  type MobileBottomNavIconKey,
} from "@constants";
import { Building2, Home, Landmark, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import styles from "./MobileBottomNav.module.scss";

const NAV_ICONS: Record<MobileBottomNavIconKey, React.ReactNode> = {
  home: <Home size={20} strokeWidth={1.85} aria-hidden="true" />,
  projects: <Building2 size={20} strokeWidth={1.85} aria-hidden="true" />,
  about: <Landmark size={20} strokeWidth={1.85} aria-hidden="true" />,
  contact: (
    <MessageSquareText size={20} strokeWidth={1.85} aria-hidden="true" />
  ),
};

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const isRouteActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={styles.bottomNavWrapper}
      aria-label="Điều hướng nhanh di động"
    >
      <ul className={styles.navList}>
        {MOBILE_BOTTOM_NAV_ITEMS.map((item) => {
          const active = isRouteActive(item.href);
          const itemClasses = [
            styles.navLink,
            active ? styles.navLinkActive : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={item.href} className={styles.navItem}>
              <Link
                href={item.href}
                className={itemClasses}
                aria-current={active ? "page" : undefined}
              >
                <span className={styles.iconBox}>
                  {NAV_ICONS[item.iconKey]}
                </span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
