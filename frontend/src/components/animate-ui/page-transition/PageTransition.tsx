import type React from "react";
import styles from "./PageTransition.module.scss";

export interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return <div className={styles.pageTransition}>{children}</div>;
};
