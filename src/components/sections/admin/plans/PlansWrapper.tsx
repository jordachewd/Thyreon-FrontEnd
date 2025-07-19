import PageHead from "@/components/layout/common/PageHead";
import css from "@/styles/sections/shared/Plans.module.css";
import { memo } from "react";

interface PlansWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

function PlansWrapper({
  title = "",
  subtitle = "",
  children,
}: PlansWrapperProps) {
  return (
    <div className={css.section}>
      <div className={css.content}>
        {title && <PageHead title={title} subtitle={subtitle} />}
        {children}
      </div>
    </div>
  );
}
export default memo(PlansWrapper);
