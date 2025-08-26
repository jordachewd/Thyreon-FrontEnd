import { memo, ReactNode } from "react";
import css from "@/styles/shared/PlanPromo.module.css";

function PromoWrapper({ children }: { children: ReactNode }) {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>{children}</div>
      <div className={css.background}></div>
    </div>
  );
}
export default memo(PromoWrapper);
