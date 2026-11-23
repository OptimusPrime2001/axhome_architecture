"use client";

import { Button, Card, Input, Skeleton } from "@components";
import { USER_ROLES } from "@constants";
import { Lock, Plus, RefreshCw, Search } from "lucide-react";
import type React from "react";
import { AccountDetailModal } from "./AccountDetailModal";
import { AccountsKpiStrip } from "./AccountsKpiStrip";
import styles from "./AccountsManagerClient.module.scss";
import { AccountsTable } from "./AccountsTable";
import { CreateAccountModal } from "./CreateAccountModal";
import {
  type AccountRoleFilter,
  useAccountsManager,
} from "./useAccountsManager";

const ROLE_TABS: { value: AccountRoleFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: USER_ROLES.ADMIN, label: "Quản trị viên" },
  { value: USER_ROLES.EDITOR, label: "Biên tập viên" },
  { value: USER_ROLES.VIEWER, label: "Người xem" },
];

export const AccountsManagerClient: React.FC = () => {
  const {
    accounts,
    filteredAccounts,
    isLoading,
    isError,
    refetch,
    isAdmin,
    currentUserId,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    selectedAccount,
    setSelectedAccountId,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateAccount,
    handleUpdateAccount,
    handleDeleteAccount,
  } = useAccountsManager();

  return (
    <div className={styles.pageContainer}>
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>
            BẢNG ĐIỀU KHIỂN <span aria-hidden="true">›</span> QUẢN LÝ TÀI KHOẢN
          </p>
          <h1 className={styles.pageTitle}>
            Quản Lý Tài Khoản & Phân Quyền Hệ Thống
          </h1>
          <p className={styles.pageSubtitle}>
            Danh sách {accounts.length} tài khoản nhân sự nội bộ được cấp quyền
            truy cập cổng quản trị AXHOME.
          </p>
        </div>

        <div className={styles.headerActions}>
          {isAdmin ? (
            <Button
              type="button"
              variant="dark"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              leftIcon={<Plus size={15} aria-hidden="true" />}
            >
              Thêm Tài Khoản
            </Button>
          ) : (
            <span className={styles.readOnlyPill}>
              <Lock size={13} aria-hidden="true" />
              <span>Chế độ chỉ xem</span>
            </span>
          )}
        </div>
      </header>

      {/* KPI Summary */}
      <AccountsKpiStrip accounts={accounts} />

      {/* Filter Toolbar & Table */}
      <Card className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div
            className={styles.roleTabs}
            role="tablist"
            aria-label="Lọc vai trò"
          >
            {ROLE_TABS.map((tab) => {
              const active = roleFilter === tab.value;
              const count =
                tab.value === "all"
                  ? accounts.length
                  : accounts.filter((a) => a.role === tab.value).length;

              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`${styles.roleTab} ${active ? styles.roleTabActive : ""}`}
                  onClick={() => setRoleFilter(tab.value)}
                >
                  <span>{tab.label}</span>
                  <span className={styles.tabCount}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.searchBox}>
            <Search
              size={15}
              className={styles.searchIcon}
              aria-hidden="true"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo họ tên hoặc email..."
              aria-label="Tìm kiếm tài khoản"
              className={styles.searchInput}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingStack}>
            <Skeleton style={{ height: "48px", borderRadius: "6px" }} />
            <Skeleton style={{ height: "48px", borderRadius: "6px" }} />
            <Skeleton style={{ height: "48px", borderRadius: "6px" }} />
          </div>
        ) : isError ? (
          <div className={styles.errorBox}>
            <p>Không thể tải danh sách tài khoản từ máy chủ.</p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => void refetch()}
              leftIcon={<RefreshCw size={14} aria-hidden="true" />}
            >
              Thử lại
            </Button>
          </div>
        ) : (
          <AccountsTable
            accounts={filteredAccounts}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            onSelectAccount={(id) => setSelectedAccountId(id)}
          />
        )}
      </Card>

      {/* Edit / View Account Modal */}
      {selectedAccount && (
        <AccountDetailModal
          account={selectedAccount}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onClose={() => setSelectedAccountId(null)}
          onUpdate={handleUpdateAccount}
          onDelete={handleDeleteAccount}
        />
      )}

      {/* Create Account Modal (Admin only) */}
      {isAdmin && isCreateModalOpen && (
        <CreateAccountModal
          isCreating={isCreating}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateAccount}
        />
      )}
    </div>
  );
};
