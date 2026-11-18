import { Badge, Button, Card } from "@components";
import { ArrowLeft, Compass, FolderKanban } from "lucide-react";
import styles from "../../AppSystemStates.module.scss";

export default function AdminPanelNotFound() {
  return (
    <div className={styles.stateWrapper}>
      <Card className={styles.stateCard}>
        <span className={styles.iconCircle} aria-hidden="true">
          <Compass size={26} />
        </span>

        <Badge variant="pending" showDot={false}>
          PHÂN HỆ CHƯA CẤU HÌNH HOẶC ĐANG PHÁT TRIỂN
        </Badge>

        <h1 className={styles.title}>Không tìm thấy trang quản trị yêu cầu</h1>

        <p className={styles.description}>
          Đường dẫn quản trị này hiện chưa được cấu hình hoặc đang nằm trong lộ
          trình triển khai tiếp theo của hệ thống CMS AXHOME.
        </p>

        <div className={styles.actionsRow}>
          <Button
            href="/admin/dashboard"
            variant="dark"
            size="sm"
            leftIcon={<ArrowLeft size={15} aria-hidden="true" />}
          >
            Về Tổng Quan Hệ Thống
          </Button>
          <Button
            href="/admin/projects"
            variant="secondary"
            size="sm"
            leftIcon={<FolderKanban size={15} aria-hidden="true" />}
          >
            Quản Lý Dự Án
          </Button>
        </div>
      </Card>
    </div>
  );
}
