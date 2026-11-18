import { Button, Card } from "@components";
import { ArrowLeft, Compass, FolderKanban } from "lucide-react";
import styles from "./AppSystemStates.module.scss";

export default function GlobalNotFound() {
  return (
    <div className={styles.stateWrapper}>
      <Card className={styles.stateCard}>
        <span className={styles.iconCircle} aria-hidden="true">
          <Compass size={26} />
        </span>

        <p className={styles.eyebrow}>
          MÃ TRẠNG THÁI 404 • KHÔNG TÌM THẤY TRANG
        </p>

        <h1 className={styles.title}>
          Không gian hoặc đường dẫn này hiện chưa tồn tại
        </h1>

        <p className={styles.description}>
          Trang bạn đang tìm kiếm có thể đã được di chuyển, đổi đường dẫn hoặc
          đang trong quá trình cập nhật hồ sơ kiến trúc mới từ AXHOME.
        </p>

        <div className={styles.actionsRow}>
          <Button
            href="/"
            variant="dark"
            size="md"
            leftIcon={<ArrowLeft size={16} aria-hidden="true" />}
          >
            Về Trang Chủ
          </Button>
          <Button
            href="/projects"
            variant="secondary"
            size="md"
            leftIcon={<FolderKanban size={16} aria-hidden="true" />}
          >
            Khám Phá Dự Án
          </Button>
        </div>
      </Card>
    </div>
  );
}
