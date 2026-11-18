import { cn } from "@lib/utils";
import { Loader2Icon } from "lucide-react";
import styles from "./Spinner.module.scss";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(styles.spinner, className)}
      {...props}
    />
  );
}

export { Spinner };
