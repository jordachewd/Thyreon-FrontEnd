import css from "@/styles/layout/MainWrapper.module.css";
import { ReactNode } from "react";

interface MainWrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <main id="MainWrapper" className={css.main}>
      {children}
    </main>
  );
}
