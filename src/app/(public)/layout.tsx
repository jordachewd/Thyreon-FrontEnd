import MainWrapper from "@/components/layout/wrappers/MainWrapper";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <MainWrapper>{children}</MainWrapper>;
}
