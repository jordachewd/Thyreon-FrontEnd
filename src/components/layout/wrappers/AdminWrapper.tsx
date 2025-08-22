import css from "@/styles/layout/admin/AdminWrapper.module.css";
import { ReactNode } from "react";
import AlertMessage from "../common/AlertMessage";
import MainWrapper from "./MainWrapper";

export default function AdminWrapper({ children }: { children: ReactNode }) {
  return (
    <MainWrapper>
      <AlertMessage />
      <div id="AdminWrapper" className={css.wrapper}>
        {children}
      </div>
    </MainWrapper>
  );
}
