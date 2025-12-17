import { ReactNode } from "react";

interface ThemeProps {
  children: ReactNode;
}

export default function WPGuardProvider({ children }: ThemeProps) {
  return <>{children}</>;
}
