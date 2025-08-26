import PageHead from "@/components/layout/common/PageHead";
import css from "@/styles/sections/shared/Plans.module.css";
import { PlansWrapperType } from "@/types/plan/plan-wrapper.d";
import classNames from "classnames";
import { memo } from "react";

function PlansWrapper(props: PlansWrapperType) {
  const { title, subtitle, className, children } = props;
  const sectionCss = classNames(css.section, className);

  return (
    <div className={sectionCss}>
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
