"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import {
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_STYLE_LABELS,
} from "@constants";
import type { Project } from "@shared-types";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  FileClock,
  FolderSearch,
  MapPin,
  Pencil,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import styles from "./ProjectsTable.module.scss";

export interface ProjectsTableProps {
  paginatedProjects: Project[];
  totalFilteredCount: number;
  currentPage: number;
  pageSize: number;
  selectedIds: string[];
  onToggleSelectAllPage: () => void;
  onToggleSelectRow: (id: string) => void;
  onClearSelection: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onToggleStatus: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onBulkUpdateStatus: (status: "published" | "draft") => void;
  onRequestDelete: (ids: string[]) => void;
  onResetFilters: () => void;
}

function formatProjectCode(id: string): string {
  const numPart = id.replace(/\D/g, "").padStart(2, "0");
  return `AX-${numPart || id.toUpperCase()}`;
}

function getConstructionStats(project: Project): {
  percent: number;
  completedCount: number;
  totalCount: number;
} {
  const totalCount = project.milestones?.length ?? 0;
  if (totalCount === 0) {
    return {
      percent: project.projectType === "completed" ? 100 : 50,
      completedCount: 0,
      totalCount: 0,
    };
  }
  const completedCount =
    project.milestones?.filter((m) => m.isCompleted).length ?? 0;
  return {
    percent: Math.round((completedCount / totalCount) * 100),
    completedCount,
    totalCount,
  };
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  paginatedProjects,
  totalFilteredCount,
  currentPage,
  pageSize,
  selectedIds,
  onToggleSelectAllPage,
  onToggleSelectRow,
  onClearSelection,
  onPageChange,
  onPageSizeChange,
  onToggleStatus,
  onToggleFeatured,
  onBulkUpdateStatus,
  onRequestDelete,
  onResetFilters,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / pageSize));
  const startIndex =
    totalFilteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalFilteredCount);

  const allPageSelected =
    paginatedProjects.length > 0 &&
    paginatedProjects.every((p) => selectedIds.includes(p.id));

  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <section className={styles.tableSection} aria-label="Bảng danh sách dự án">
      {/* Bulk Selection Bar */}
      {selectedIds.length > 0 && (
        <div className={styles.bulkToolbar}>
          <span className={styles.bulkCount}>
            Đã chọn <strong>{selectedIds.length}</strong> hồ sơ dự án
          </span>

          <div className={styles.bulkActions}>
            <button
              type="button"
              className={styles.bulkBtn}
              onClick={() => onBulkUpdateStatus("published")}
            >
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>Xuất bản nhanh</span>
            </button>
            <button
              type="button"
              className={styles.bulkBtn}
              onClick={() => onBulkUpdateStatus("draft")}
            >
              <FileClock size={14} aria-hidden="true" />
              <span>Chuyển về Bản nháp</span>
            </button>
            <button
              type="button"
              className={`${styles.bulkBtn} ${styles.bulkBtnDanger}`}
              onClick={() => onRequestDelete(selectedIds)}
            >
              <Trash2 size={14} aria-hidden="true" />
              <span>Xóa đã chọn</span>
            </button>
            <button
              type="button"
              className={`${styles.bulkBtn} ${styles.bulkBtnGhost}`}
              onClick={onClearSelection}
            >
              <X size={14} aria-hidden="true" />
              <span>Bỏ chọn</span>
            </button>
          </div>
        </div>
      )}

      {totalFilteredCount === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIconBox} aria-hidden="true">
            <FolderSearch size={24} />
          </span>
          <h3 className={styles.emptyTitle}>
            Không tìm thấy hồ sơ dự án phù hợp
          </h3>
          <p className={styles.emptyDesc}>
            Không có bản vẽ thiết kế hoặc công trình nào khớp với từ khóa và tổ
            hợp bộ lọc hiện tại. Hãy thử điều chỉnh hoặc xóa bộ lọc để xem lại
            danh sách.
          </p>
          <button
            type="button"
            className={styles.emptyResetBtn}
            onClick={onResetFilters}
          >
            Khôi phục toàn bộ danh sách
          </button>
        </div>
      ) : (
        <>
          <div className={styles.tableScrollWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th scope="col" className={styles.checkboxCol}>
                    <input
                      type="checkbox"
                      checked={allPageSelected}
                      onChange={onToggleSelectAllPage}
                      className={styles.checkboxInput}
                      aria-label="Chọn tất cả dự án trên trang hiện tại"
                    />
                  </th>
                  <th scope="col" className={styles.thumbCol}>
                    Hình ảnh
                  </th>
                  <th scope="col">Dự án & Chủ trì</th>
                  <th scope="col">Phân loại & Tiến độ</th>
                  <th scope="col">Quy mô & Diện tích</th>
                  <th scope="col">Trạng thái Web</th>
                  <th scope="col" className={styles.actionsCol}>
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedProjects.map((project) => {
                  const isSelected = selectedIds.includes(project.id);
                  const stats = getConstructionStats(project);
                  const floorPlansCount = project.floorPlans?.length ?? 0;

                  return (
                    <tr
                      key={project.id}
                      className={isSelected ? styles.rowSelected : undefined}
                    >
                      {/* Col 1: Checkbox */}
                      <td className={styles.checkboxCol}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelectRow(project.id)}
                          className={styles.checkboxInput}
                          aria-label={`Chọn dự án ${project.title}`}
                        />
                      </td>

                      {/* Col 2: Thumbnail */}
                      <td className={styles.thumbCol}>
                        <div className={styles.thumbFrame}>
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="88px"
                            className={styles.thumbImage}
                            unoptimized
                          />
                          {project.isFeatured && (
                            <span
                              className={styles.featuredCorner}
                              title="Đang ghim nổi bật trang chủ"
                            >
                              <Star size={11} fill="currentColor" />
                            </span>
                          )}
                          <span className={styles.mediaTag}>
                            {project.projectType === "concept" ? "3D" : "HD"}
                          </span>
                        </div>
                      </td>

                      {/* Col 3: Project Title, Style, Code, Location, Architect */}
                      <td>
                        <div className={styles.projectInfoCell}>
                          <div className={styles.titleRow}>
                            <Link
                              href={`/admin/projects/${project.id}`}
                              className={styles.projectTitleLink}
                            >
                              {project.title}
                            </Link>
                            <span className={styles.stylePill}>
                              {PROJECT_STYLE_LABELS[project.style]}
                            </span>
                          </div>

                          <div className={styles.metaRow}>
                            <span className={styles.projectCode}>
                              Mã: {formatProjectCode(project.id)}
                            </span>
                            <span className={styles.metaDot} aria-hidden="true">
                              •
                            </span>
                            <span className={styles.metaItem}>
                              <User size={12} aria-hidden="true" />
                              <span>{project.leadArchitect}</span>
                            </span>
                          </div>

                          <div className={styles.metaRow}>
                            <span className={styles.metaItem}>
                              <MapPin size={12} aria-hidden="true" />
                              <span>{project.city}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Col 4: Type & Adaptive Progress / Blueprints */}
                      <td>
                        <div className={styles.typeProgressCell}>
                          {project.projectType === "concept" && (
                            <>
                              <div className={styles.typeHeaderRow}>
                                <span
                                  className={`${styles.typeBadge} ${styles.typeBadgeConcept}`}
                                >
                                  <span
                                    className={styles.badgeDot}
                                    aria-hidden="true"
                                  />
                                  <span>Bản Vẽ 3D</span>
                                </span>
                              </div>
                              <span className={styles.subDetailText}>
                                {floorPlansCount > 0
                                  ? `${floorPlansCount} bản vẽ mặt bằng công năng`
                                  : "Hồ sơ phối cảnh kiến trúc"}
                              </span>
                            </>
                          )}

                          {project.projectType === "under_construction" && (
                            <>
                              <div className={styles.typeHeaderRow}>
                                <span
                                  className={`${styles.typeBadge} ${styles.typeBadgeConstruction}`}
                                >
                                  <span
                                    className={styles.badgeDot}
                                    aria-hidden="true"
                                  />
                                  <span>Đang Thi Công</span>
                                </span>
                                <span className={styles.progressPercent}>
                                  {stats.percent}%
                                </span>
                              </div>
                              <div
                                className={styles.progressBarTrack}
                                aria-hidden="true"
                              >
                                <div
                                  className={styles.progressBarFill}
                                  style={{ width: `${stats.percent}%` }}
                                />
                              </div>
                              <span className={styles.subDetailText}>
                                {stats.totalCount > 0
                                  ? `Hoàn tất ${stats.completedCount}/${stats.totalCount} mốc kỹ thuật`
                                  : "Đang triển khai hiện trường"}
                              </span>
                            </>
                          )}

                          {project.projectType === "completed" && (
                            <>
                              <div className={styles.typeHeaderRow}>
                                <span
                                  className={`${styles.typeBadge} ${styles.typeBadgeCompleted}`}
                                >
                                  <span
                                    className={styles.badgeDot}
                                    aria-hidden="true"
                                  />
                                  <span>Đã Bàn Giao</span>
                                </span>
                                <span className={styles.progressPercent}>
                                  100%
                                </span>
                              </div>
                              <div
                                className={styles.progressBarTrack}
                                aria-hidden="true"
                              >
                                <div
                                  className={styles.progressBarFill}
                                  style={{ width: "100%" }}
                                />
                              </div>
                              <span className={styles.subDetailText}>
                                Năm {project.completedYear}
                                {project.constructionDuration
                                  ? ` • ${project.constructionDuration}`
                                  : ""}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Col 5: Specs (Area, Category, Scale) */}
                      <td>
                        <div className={styles.specsCell}>
                          <div className={styles.areaPrimary}>
                            <span className={styles.areaNumber}>
                              {project.floorArea} m²
                            </span>
                            <span className={styles.categoryLabel}>
                              • {PROJECT_CATEGORY_LABELS[project.category]}
                            </span>
                          </div>
                          <span className={styles.scaleSub}>
                            {project.floorsCount} Tầng • Đất {project.landArea}{" "}
                            m²
                          </span>
                        </div>
                      </td>

                      {/* Col 6: Publication Status & Featured Toggle */}
                      <td>
                        <div className={styles.statusCell}>
                          <button
                            type="button"
                            onClick={() => onToggleStatus(project.id)}
                            title="Bấm để chuyển đổi trạng thái Xuất bản / Bản nháp"
                            className={`${styles.statusBadgeBtn} ${
                              project.status === "published"
                                ? styles.statusPublished
                                : styles.statusDraft
                            }`}
                          >
                            <span
                              className={styles.badgeDot}
                              aria-hidden="true"
                            />
                            <span>{PROJECT_STATUS_LABELS[project.status]}</span>
                          </button>

                          <div className={styles.statusSubRow}>
                            <span
                              className={styles.viewStat}
                              title="Lượt xem trang chi tiết"
                            >
                              <Eye size={12} aria-hidden="true" />
                              <span>
                                {project.viewCount.toLocaleString("vi-VN")}
                              </span>
                            </span>

                            <button
                              type="button"
                              onClick={() => onToggleFeatured(project.id)}
                              className={`${styles.featuredToggleBtn} ${
                                project.isFeatured ? styles.featuredActive : ""
                              }`}
                              title={
                                project.isFeatured
                                  ? "Bỏ ghim khỏi Trang chủ"
                                  : "Ghim nổi bật lên Trang chủ"
                              }
                            >
                              <Star
                                size={12}
                                fill={
                                  project.isFeatured ? "currentColor" : "none"
                                }
                              />
                              <span>
                                {project.isFeatured ? "Nổi bật" : "Ghim"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Col 7: Row Actions */}
                      <td className={styles.actionsCol}>
                        <div className={styles.actionGroup}>
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Xem trang công khai của ${project.title}`}
                            title={
                              project.status === "published"
                                ? "Xem trên website"
                                : "Dự án đang ở Bản nháp (chưa hiển thị công khai)"
                            }
                            className={`${styles.iconActionBtn} ${
                              project.status !== "published"
                                ? styles.iconActionDisabled
                                : ""
                            }`}
                            tabIndex={project.status !== "published" ? -1 : 0}
                          >
                            <ExternalLink size={15} />
                          </Link>

                          <Link
                            href={`/admin/projects/${project.id}`}
                            aria-label={`Chỉnh sửa dự án ${project.title}`}
                            title="Biên tập hồ sơ dự án"
                            className={styles.iconActionBtn}
                          >
                            <Pencil size={15} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => onRequestDelete([project.id])}
                            aria-label={`Xóa dự án ${project.title}`}
                            title="Xóa dự án"
                            className={`${styles.iconActionBtn} ${styles.iconActionDanger}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className={styles.paginationFooter}>
            <div className={styles.paginationMeta}>
              <span>
                Hiển thị{" "}
                <strong>
                  {startIndex} – {endIndex}
                </strong>{" "}
                trên tổng số <strong>{totalFilteredCount}</strong> dự án
              </span>

              <span aria-hidden="true">•</span>

              <div className={styles.pageSizeLabel}>
                <span>Hiển thị:</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => onPageSizeChange(Number(value))}
                >
                  <SelectTrigger aria-label="Số dòng hiển thị mỗi trang">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 dòng / trang</SelectItem>
                    <SelectItem value="10">10 dòng / trang</SelectItem>
                    <SelectItem value="20">20 dòng / trang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={styles.pageControls}>
              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Trang trước"
              >
                <ChevronLeft size={15} />
                <span>Trước</span>
              </button>

              {pageNumbers.map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                  className={`${styles.pageBtn} ${
                    pageNum === currentPage ? styles.pageBtnActive : ""
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Trang sau"
              >
                <span>Sau</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
