import css from "@/styles/layout/shared/PageWrapper.module.css";
import classNames from "classnames";
import { memo, ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

function PageWrapper({ children, className: style }: PageWrapperProps) {
  const wrapperCss = classNames(css.wrapper, style);
  return <div className={wrapperCss}>{children}</div>;
}
export default memo(PageWrapper);
