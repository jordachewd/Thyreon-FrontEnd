import { ReactNode } from "react";
import css from "@/styles/shared/PlanPromo.module.css";

export default function PromoWrapper({ children }: { children: ReactNode }) {
  return (
    <div className={css.wrapper}>
      <div className={css.content}>{children}</div>
      <div className={css.background}></div>
    </div>
  );
}
