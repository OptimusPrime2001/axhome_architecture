import { Spinner } from "@components";
import styles from "./AppSystemStates.module.scss";

export default function GlobalLoading() {
  return (
    <div className={styles.loadingWrap} aria-live="polite">
      <Spinner className={styles.spinnerIcon} />
      <span>Đang tải dữ liệu không gian kiến trúc...</span>
    </div>
  );
}
