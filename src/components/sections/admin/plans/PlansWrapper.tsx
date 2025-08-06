import PageHead from "@/components/layout/common/PageHead";
import css from "@/styles/sections/shared/Plans.module.css";
import { PlansWrapperType } from "@/types/plan/plan-wrapper.d";
import { memo } from "react";

function PlansWrapper({ title, subtitle, children }: PlansWrapperType) {
  return (
    <div className={css.section}>
      <div className={css.content}>
        {title && (
          <div className={css.head}>
            <PageHead title={title} subtitle={subtitle} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
export default memo(PlansWrapper);
