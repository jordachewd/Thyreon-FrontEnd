import css from "@/styles/layout/shared/MainWrapper.module.css";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: WrapperProps) {
  return (
    <main id="MainWrapper" className={css.main}>
      {children}
    </main>
  );
}
