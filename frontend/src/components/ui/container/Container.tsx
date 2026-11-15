import type * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Container.module.scss";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "normal" | "narrow" | "wide";
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  size = "normal",
  children,
  className,
  ...props
}) => {
  return (
    <Component
      className={cn(
        styles.container,
        size === "narrow" && styles.narrow,
        size === "wide" && styles.wide,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
