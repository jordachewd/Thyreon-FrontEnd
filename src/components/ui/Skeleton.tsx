import React from "react";

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | false;
  className?: string;
}

export default function Skeleton({
  variant = "text",
  width,
  height,
  animation = "pulse",
  className = "",
}: SkeletonProps) {
  const style: React.CSSProperties = {};

  if (width) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }

  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  const classNames = [
    "skeleton",
    `skeleton-${variant}`,
    animation && `skeleton-${animation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classNames} style={style} />;
}
