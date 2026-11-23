"use client";

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react";
import type React from "react";
import { Toaster as Sonner, toast } from "sonner";
import styles from "./Sonner.module.scss";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      closeButton
      duration={4000}
      className={styles.toaster}
      icons={{
        success: <CircleCheck size={18} aria-hidden="true" />,
        info: <Info size={18} aria-hidden="true" />,
        warning: <TriangleAlert size={18} aria-hidden="true" />,
        error: <OctagonX size={18} aria-hidden="true" />,
        loading: (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          title: styles.title,
          description: styles.description,
          icon: styles.icon,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
          info: styles.info,
          actionButton: styles.actionButton,
          cancelButton: styles.cancelButton,
          closeButton: styles.closeButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
