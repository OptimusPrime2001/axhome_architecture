"use client";

import { Button, Card } from "@components";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import styles from "./AppSystemStates.module.scss";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
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

        <p className={styles.eyebrow}>GIÁN ĐOẠN HIỂN THỊ TẠM THỜI</p>

        <h1 className={styles.title}>Đã xảy ra sự cố khi tải trang này</h1>

        <p className={styles.description}>
          Hệ thống gặp lỗi ngoài dự kiến trong quá trình hiển thị dữ liệu. Bạn
          có thể thử tải lại trang hoặc quay về trang chủ.
        </p>

        <div className={styles.actionsRow}>
          <Button
            type="button"
            variant="dark"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw size={16} aria-hidden="true" />}
          >
            Thử tải lại
          </Button>
          <Button
            href="/"
            variant="secondary"
            size="md"
            leftIcon={<Home size={16} aria-hidden="true" />}
          >
            Về Trang Chủ
          </Button>
        </div>
      </Card>
    </div>
  );
}
