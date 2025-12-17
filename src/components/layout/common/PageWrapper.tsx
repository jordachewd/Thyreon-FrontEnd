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
  const wrapperCss = classNames("page-wrapper", style);
  return <div className={wrapperCss}>{children}</div>;
}
