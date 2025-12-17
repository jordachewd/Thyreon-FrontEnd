import React from "react";

export interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "subtitle1"
    | "subtitle2";
  component?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  gutterBottom?: boolean;
  color?: "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
}

export default function Typography({
  variant = "body1",
  component,
  children,
  className = "",
  gutterBottom = false,
  color = "textPrimary",
}: TypographyProps) {
  const Component = component || variantMapping[variant] || "p";

  const classNames = [
    "typography",
    `typography-${variant}`,
    gutterBottom && "typography-gutter-bottom",
    color && `typography-${color}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classNames}>{children}</Component>;
}

const variantMapping: Record<string, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
};
