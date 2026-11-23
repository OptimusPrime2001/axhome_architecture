import { Badge, Button } from "@components";
import { USER_ROLES } from "@constants";
import type { AdminAccount, UserRole } from "@shared-types";
import { Calendar, Eye, Mail, Pencil, Users } from "lucide-react";
import type React from "react";
import styles from "./AccountsTable.module.scss";

export interface AccountsTableProps {
  accounts: AdminAccount[];
  currentUserId: string;
  isAdmin: boolean;
  onSelectAccount: (id: string) => void;
}

const ROLE_META: Record<
  UserRole,
  { label: string; variant: "published" | "progress" | "draft" }
> = {
  [USER_ROLES.ADMIN]: { label: "Quản trị viên", variant: "published" },
  [USER_ROLES.EDITOR]: { label: "Biên tập viên", variant: "progress" },
  [USER_ROLES.VIEWER]: { label: "Người xem", variant: "draft" },
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  currentUserId,
  isAdmin,
  onSelectAccount,
}) => {
  if (accounts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon} aria-hidden="true">
          <Users size={24} />
        </span>
        <p className={styles.emptyTitle}>Không tìm thấy tài khoản phù hợp</p>
        <p className={styles.emptyDesc}>
          Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc vai trò phân quyền.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Tài khoản</th>
            <th scope="col">Email đăng nhập</th>
            <th scope="col">Vai trò</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col" className={styles.actionsCol}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => {
            const isSelf = account.id === currentUserId;
            const roleInfo = ROLE_META[account.role];

            return (
              <tr
                key={account.id}
                className={styles.row}
                onClick={() => onSelectAccount(account.id)}
              >
                <td>
                  <div className={styles.userCell}>
                    <span className={styles.avatar} aria-hidden="true">
                      {account.initials}
                    </span>
                    <div className={styles.userMeta}>
                      <div className={styles.nameRow}>
                        <span className={styles.fullName}>
                          {account.fullName}
                        </span>
                        {isSelf && <span className={styles.selfTag}>Bạn</span>}
                      </div>
                      <span className={styles.idSub}>
                        #{account.id.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={styles.emailCell}>
                    <Mail size={13} aria-hidden="true" />
                    <span>{account.email}</span>
                  </span>
                </td>

                <td>
                  <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>
                </td>

                <td>
                  <span className={styles.dateCell}>
                    <Calendar size={13} aria-hidden="true" />
                    <span>{formatDate(account.createdAt)}</span>
                  </span>
                </td>

                <td className={styles.actionsCol}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAccount(account.id);
                    }}
                    leftIcon={
                      isAdmin ? (
                        <Pencil size={13} aria-hidden="true" />
                      ) : (
                        <Eye size={13} aria-hidden="true" />
                      )
                    }
                  >
                    {isAdmin ? "Chỉnh sửa" : "Xem chi tiết"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
