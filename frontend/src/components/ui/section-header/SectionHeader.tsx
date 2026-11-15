import type * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./SectionHeader.module.scss";

export interface SectionHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(styles.sectionHeader, styles[`align-${align}`], className)}
    >
      {tag && (
        <div className={styles.tag}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.tagText}>{tag}</span>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
