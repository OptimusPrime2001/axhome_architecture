import { Spinner } from "@components";
import styles from "../../AppSystemStates.module.scss";

export default function AdminPanelLoading() {
  return (
    <div className={styles.loadingWrap} aria-live="polite">
      <Spinner className={styles.spinnerIcon} />
      <span>Đang tải phân hệ quản trị...</span>
    </div>
  );
}
