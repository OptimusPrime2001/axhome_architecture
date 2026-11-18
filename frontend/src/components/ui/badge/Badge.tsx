import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.scss";

export const badgeVariants = cva(styles.badge, {
  variants: {
    variant: {
      published: styles["status-published"],
      draft: styles["status-draft"],
      pending: styles["status-pending"],
      progress: styles["status-progress"],
      completed: styles["status-completed"],
      cancelled: styles["status-cancelled"],
      concept: styles["status-concept"],
      neutral: styles["status-neutral"],
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  showDot = true,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && <span className={styles.dot} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
};
