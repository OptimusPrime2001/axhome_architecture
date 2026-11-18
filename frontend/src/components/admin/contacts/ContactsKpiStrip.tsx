import { Badge, Card, CardContent } from "@components";
import type { ConsultationLead } from "@shared-types";
import { Award, BellRing, Compass, Inbox } from "lucide-react";
import type React from "react";
import styles from "./ContactsKpiStrip.module.scss";

export interface ContactsKpiStripProps {
  leads: ConsultationLead[];
}

export const ContactsKpiStrip: React.FC<ContactsKpiStripProps> = ({
  leads,
}) => {
  const totalCount = leads.length;
  const pendingCount = leads.filter(
    (item) => item.leadStatus === "pending",
  ).length;
  const activeCount = leads.filter(
    (item) =>
      item.leadStatus === "in_progress" || item.leadStatus === "scheduled",
  ).length;
  const scheduledCount = leads.filter(
    (item) => item.leadStatus === "scheduled",
  ).length;
  const wonCount = leads.filter((item) => item.leadStatus === "won").length;
  const winRate =
    totalCount > 0 ? Math.round((wonCount / totalCount) * 100) : 0;

  return (
    <section className={styles.kpiGrid} aria-label="Thống kê yêu cầu tư vấn">
      {/* 1. Tổng yêu cầu */}
      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>TỔNG YÊU CẦU</p>
            <span className={styles.iconBox} aria-hidden="true">
              <Inbox size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>{totalCount}</p>
          <p className={styles.metaText}>Tiếp nhận từ các form & hotline</p>
        </CardContent>
      </Card>

      {/* 2. Chờ xử lý */}
      <Card className={pendingCount > 0 ? styles.urgentCard : undefined}>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>CHỜ XỬ LÝ</p>
            <span
              className={`${styles.iconBox} ${styles.urgentIcon}`}
              aria-hidden="true"
            >
              <BellRing size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>
            {String(pendingCount).padStart(2, "0")}
          </p>
          <div className={styles.urgentFooter}>
            <span>Cần liên hệ trong 24h</span>
            {pendingCount > 0 && (
              <Badge variant="pending" showDot={false}>
                Ưu tiên cao
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Đang tư vấn & Đã hẹn */}
      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>ĐANG TƯ VẤN & ĐÃ HẸN</p>
            <span className={styles.iconBox} aria-hidden="true">
              <Compass size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>
            {String(activeCount).padStart(2, "0")}
          </p>
          <p className={styles.metaText}>
            <strong>{scheduledCount}</strong> lịch hẹn khảo sát thực địa
          </p>
        </CardContent>
      </Card>

      {/* 4. Đã chốt HĐ */}
      <Card>
        <CardContent className={styles.cardInner}>
          <div className={styles.cardTop}>
            <p className={styles.eyebrow}>ĐÃ CHỐT HỢP ĐỒNG</p>
            <span className={styles.iconBox} aria-hidden="true">
              <Award size={17} />
            </span>
          </div>
          <p className={styles.metricValue}>
            {String(wonCount).padStart(2, "0")}
          </p>
          <p className={styles.metaText}>
            Tỷ lệ chuyển đổi: <strong>{winRate}%</strong>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
