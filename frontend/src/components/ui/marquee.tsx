"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Render a single track during SSR so search crawlers see zero duplicate text blocks,
  // then seamlessly mount clone tracks on client hydration for infinite loop animation.
  const effectiveRepeat = isHydrated ? repeat : 1;

  const copyIds = Array.from(
    { length: effectiveRepeat },
    (_, copyNumber) => `marquee-track-${copyNumber + 1}`,
  );

  return (
    <div
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {copyIds.map((copyId, copyIndex) => (
        <div
          key={copyId}
          aria-hidden={copyIndex > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) motion-reduce:animate-none",
            {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            },
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
