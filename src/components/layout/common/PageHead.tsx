"use client";

import css from "@/styles/layout/shared/PageHead.module.css";
import { Typography } from "@mui/material";
import { memo } from "react";

interface PageHeadProps {
  title: string;
  subtitle?: string | null;
  alignTitle?: "left" | "center" | "right";
  alignSubtitle?: "left" | "center" | "right";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
}

const PageHead = memo(
  ({
    title,
    subtitle,
    children,
    size = "h4",
    alignTitle = "center",
    alignSubtitle = "center",
  }: PageHeadProps) => {
    return (
      <div className={css.section}>
        <div className={css.title}>
          <Typography variant={size} align={alignTitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" align={alignSubtitle}>
              {subtitle}
            </Typography>
          )}
        </div>
        {children}
      </div>
    );
  }
);

PageHead.displayName = "PageHead";
export default PageHead;
