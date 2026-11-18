"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components";
import { AlertTriangle } from "lucide-react";
import type React from "react";
import styles from "./DeleteProjectModal.module.scss";

export interface DeleteProjectModalProps {
  isOpen: boolean;
  targetTitles: string[];
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  targetTitles,
  onClose,
  onConfirm,
}) => {
  const isBulk = targetTitles.length > 1;

  return (
    <Dialog
      open={isOpen && targetTitles.length > 0}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <div className={styles.titleGroup}>
            <span className={styles.warningIcon} aria-hidden="true">
              <AlertTriangle size={20} />
            </span>
            <DialogTitle className={styles.dialogTitle}>
              {isBulk
                ? `Xác nhận xóa ${targetTitles.length} dự án`
                : "Xác nhận xóa hồ sơ dự án"}
            </DialogTitle>
          </div>
          <DialogDescription className={styles.description}>
            {isBulk ? (
              <>
                Bạn đang yêu cầu xóa vĩnh viễn{" "}
                <strong>{targetTitles.length} hồ sơ dự án</strong> khỏi danh mục
                quản trị. Thao tác này không thể hoàn tác sau khi xác nhận:
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa dự án{" "}
                <strong>{targetTitles[0]}</strong> khỏi hệ thống quản trị không?
                Dữ liệu phối cảnh và mặt bằng đi kèm sẽ bị gỡ bỏ.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {isBulk && (
          <ul className={styles.targetList}>
            {targetTitles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        )}

        <DialogFooter className={styles.actions}>
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Hủy bỏ
          </Button>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={onConfirm}
          >
            {isBulk ? `Xóa ${targetTitles.length} dự án` : "Xóa dự án"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
