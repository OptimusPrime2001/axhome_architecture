import { Card, CardContent } from "@components";
import { USER_ROLES } from "@constants";
import type { AdminAccount } from "@shared-types";
import { Eye, PenLine, ShieldCheck, Users } from "lucide-react";
import type React from "react";
import styles from "./AccountsKpiStrip.module.scss";

export interface AccountsKpiStripProps {
  accounts: AdminAccount[];
}

export const AccountsKpiStrip: React.FC<AccountsKpiStripProps> = ({
  accounts,
}) => {
  const totalCount = accounts.length;
  const adminCount = accounts.filter((a) => a.role === USER_ROLES.ADMIN).length;
  const editorCount = accounts.filter(
    (a) => a.role === USER_ROLES.EDITOR,
  ).length;
  const viewerCount = accounts.filter(
    (a) => a.role === USER_ROLES.VIEWER,
  ).length;

  return (
    <section
      className={styles.kpiGrid}
      aria-label="Thống kê tài khoản hệ thống"
    >
      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>TỔNG TÀI KHOẢN</p>
            <span className={styles.iconBox} aria-hidden="true">
              <Users size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>{totalCount}</p>
          <p className={styles.metaText}>Nhân sự được cấp quyền truy cập CMS</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>QUẢN TRỊ VIÊN (ADMIN)</p>
            <span
              className={`${styles.iconBox} ${styles.adminIcon}`}
              aria-hidden="true"
            >
              <ShieldCheck size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>{adminCount}</p>
          <p className={styles.metaText}>
            Toàn quyền quản lý dự án, tư vấn & tài khoản
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>BIÊN TẬP VIÊN (EDITOR)</p>
            <span className={styles.iconBox} aria-hidden="true">
              <PenLine size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>{editorCount}</p>
          <p className={styles.metaText}>
            Quản lý dự án & điều phối yêu cầu tư vấn
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>NGƯỜI XEM (VIEWER)</p>
            <span className={styles.iconBox} aria-hidden="true">
              <Eye size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>{viewerCount}</p>
          <p className={styles.metaText}>
            Quyền xem báo cáo & danh sách nội bộ
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
