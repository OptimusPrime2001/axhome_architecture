"use client";

import { Button, Card } from "@components";
import { AlertTriangle, LayoutGrid, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import styles from "../../AppSystemStates.module.scss";

export default function AdminPanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin panel runtime error:", error);
  }, [error]);

  return (
    <div className={styles.stateWrapper} role="alert">
      <Card className={styles.stateCard}>
        <span
          className={`${styles.iconCircle} ${styles.errorIconCircle}`}
          aria-hidden="true"
        >
          <AlertTriangle size={26} />
        </span>

        <p className={styles.eyebrow}>LỖI XỬ LÝ PHÂN HỆ QUẢN TRỊ</p>

        <h1 className={styles.title}>Không thể hiển thị phân hệ này</h1>

        <p className={styles.description}>
          Đã xảy ra lỗi trong quá trình tải dữ liệu quản trị. Vui lòng thử lại
          hoặc quay về Bảng điều khiển trung tâm.
        </p>

        <div className={styles.actionsRow}>
          <Button
            type="button"
            variant="dark"
            size="sm"
            onClick={() => reset()}
            leftIcon={<RotateCcw size={15} aria-hidden="true" />}
          >
            Thử tải lại
          </Button>
          <Button
            href="/admin/dashboard"
            variant="secondary"
            size="sm"
            leftIcon={<LayoutGrid size={15} aria-hidden="true" />}
          >
            Về Tổng Quan
          </Button>
        </div>
      </Card>
    </div>
  );
}
