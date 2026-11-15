import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Button.module.scss";

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles["variant-primary"],
      secondary: styles["variant-secondary"],
      dark: styles["variant-dark"],
      ghost: styles["variant-ghost"],
    },
    size: {
      sm: styles["size-sm"],
      md: styles["size-md"],
      lg: styles["size-lg"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth = false,
      href,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const combinedClasses = cn(
      buttonVariants({ variant, size }),
      fullWidth && styles.fullWidth,
      className,
    );

    const content = (
      <>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClasses}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = "Button";
