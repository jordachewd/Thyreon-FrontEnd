"use client";

import { UserRole } from "@/types/users/user-role.d";
import { ReactNode } from "react";
import AlertMessage from "../common/AlertMessage";
import MainWrapper from "./MainWrapper";

type AdminWrapperProps = {
  children: ReactNode;
  role: UserRole;
};

export default function AdminWrapper({ children, role }: AdminWrapperProps) {
  return (
    <MainWrapper>
      <AlertMessage />
      <div id="AdminWrapper" className="admin-wrapper" data-user-role={role}>
        {children}
      </div>
    </MainWrapper>
  );
}
