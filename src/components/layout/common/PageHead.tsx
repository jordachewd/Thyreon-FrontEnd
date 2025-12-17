import { Typography } from "@/components/ui";
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
  const sectionCss = classNames("page-head-section", customCss);

  return (
    <div className={sectionCss}>
      <div className={`page-head-title ${!children ? "w-full" : ""}`} style={{ textAlign: alignTitle }}>
        <Typography variant={size}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body1">
            {subtitle}
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
}
