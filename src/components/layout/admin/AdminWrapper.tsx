import css from "@/styles/layout/admin/AdminWrapper.module.css";
import { ReactNode } from "react";
import AlertMessage from "../common/AlertMessage";

interface AdminPageWrapperProps {
  children: ReactNode;
}

export default function AdminWrapper({ children }: AdminPageWrapperProps) {
  return (
    <>
      <AlertMessage />
      <div id="AdminWrapper" className={css.wrapper}>
        {children}
      </div>
    </>
  );
}
