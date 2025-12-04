import css from "@/styles/layout/shared/PageWrapper.module.css";
import classNames from "classnames";
import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function PageWrapper({
  children,
  className: style,
}: PageWrapperProps) {
  const wrapperCss = classNames(css.wrapper, style);
  return <div className={wrapperCss}>{children}</div>;
}
