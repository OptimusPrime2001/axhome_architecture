"use client";

import { motion, type Transition } from "motion/react";
import type React from "react";

const SOFT_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];
export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  offsetY?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  offsetY = 50,
  duration = 0.7,
}) => {
  const transition: Transition = {
    duration,
    delay,
    ease: SOFT_EASE,
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -80px 0px" }}
      transition={transition}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.04,
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: SOFT_EASE,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
