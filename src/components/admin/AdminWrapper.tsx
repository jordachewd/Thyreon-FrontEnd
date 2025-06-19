import css from "@/styles/admin/AdminWrapper.module.css";
import { ReactNode } from "react";

interface AdminPageWrapperProps {
  children: ReactNode;
}

export default function AdminWrapper({ children }: AdminPageWrapperProps) {
  return (
    <div id="AdminWrapper" className={css.wrapper}>
      {children}
    </div>
  );
}
