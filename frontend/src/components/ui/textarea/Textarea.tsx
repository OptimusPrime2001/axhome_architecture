import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** Trạng thái Invalid — đặt true để viền chuyển màu lỗi (rule 08 §3) */
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        aria-invalid={invalid || props["aria-invalid"]}
        className={cn(styles.textarea, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
