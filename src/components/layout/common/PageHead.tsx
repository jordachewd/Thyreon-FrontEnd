import css from "@/styles/layout/shared/PageHead.module.css";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { ReactNode } from "react";

interface PageHeadProps {
  title: string;
  titleLink?: string;
  subtitle?: string;
  alignTitle?: "left" | "center" | "right";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: ReactNode;
  className?: string;
}

export default function PageHead({
  title,
  subtitle,
  children,
  size = "h4",
  alignTitle = "center",
  className: customCss = "",
}: PageHeadProps) {
  const sectionCss = classNames(css.section, customCss);

  return (
    <div className={sectionCss}>
      <div className={`${css.title} ${!children ? "w-full" : ""}`}>
        <Typography variant={size} align={alignTitle}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body1" align={alignTitle}>
            {subtitle}
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
}
