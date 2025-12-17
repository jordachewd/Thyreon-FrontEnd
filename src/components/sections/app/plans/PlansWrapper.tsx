import PageHead from "@/components/layout/common/PageHead";
import { PlansWrapperType } from "@/types/plan/plan-wrapper.d";
import classNames from "classnames";

export default function PlansWrapper(props: PlansWrapperType) {
  const { title, subtitle, className, children } = props;
  const sectionCss = classNames("plans-section", className);

  return (
    <div className={sectionCss}>
      <div className="plans-content">
        {title && (
          <div className="plans-head">
            <PageHead title={title} subtitle={subtitle} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
