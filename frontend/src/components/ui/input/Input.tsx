import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Input.module.scss";

export interface InputProps extends React.ComponentProps<"input"> {
  /** Trạng thái Invalid — đặt true để viền chuyển màu lỗi (rule 08 §3) */
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={invalid || props["aria-invalid"]}
        className={cn(styles.input, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
