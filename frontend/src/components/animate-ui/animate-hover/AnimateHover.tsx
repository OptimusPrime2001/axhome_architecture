"use client";

import { AnimateIcon } from "@animate-ui/react/icons";
import Link from "next/link";
import type React from "react";

type AnimateHoverLiProps = {
  as?: "li";
} & React.ComponentPropsWithoutRef<"li">;

type AnimateHoverDivProps = {
  as: "div";
} & React.ComponentPropsWithoutRef<"div">;

type AnimateHoverSpanProps = {
  as: "span";
} & React.ComponentPropsWithoutRef<"span">;

type AnimateHoverArticleProps = {
  as: "article";
} & React.ComponentPropsWithoutRef<"article">;

export type AnimateHoverItemProps =
  | AnimateHoverLiProps
  | AnimateHoverDivProps
  | AnimateHoverSpanProps
  | AnimateHoverArticleProps;

export const AnimateHoverItem: React.FC<AnimateHoverItemProps> = (props) => {
  if (props.as === "div") {
    const { as: _, children, ...divProps } = props;
    return (
      <AnimateIcon animateOnHover asChild>
        <div {...divProps}>{children}</div>
      </AnimateIcon>
    );
  }

  if (props.as === "span") {
    const { as: _, children, ...spanProps } = props;
    return (
      <AnimateIcon animateOnHover asChild>
        <span {...spanProps}>{children}</span>
      </AnimateIcon>
    );
  }

  if (props.as === "article") {
    const { as: _, children, ...articleProps } = props;
    return (
      <AnimateIcon animateOnHover asChild>
        <article {...articleProps}>{children}</article>
      </AnimateIcon>
    );
  }

  const { as: _, children, ...liProps } = props;
  return (
    <AnimateIcon animateOnHover asChild>
      <li {...liProps}>{children}</li>
    </AnimateIcon>
  );
};

export type AnimateHoverLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

export const AnimateHoverLink: React.FC<AnimateHoverLinkProps> = ({
  children,
  ...props
}) => (
  <AnimateIcon animateOnHover asChild>
    <Link {...props}>{children}</Link>
  </AnimateIcon>
);
