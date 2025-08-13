import css from "@/styles/layout/shared/PageWrapper.module.css";
import { memo, ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

function PageWrapper({ children }: PageWrapperProps) {
  return <div className={css.wrapper}>{children}</div>;
}
export default memo(PageWrapper);
