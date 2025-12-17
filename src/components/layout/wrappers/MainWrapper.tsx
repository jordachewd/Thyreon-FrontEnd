import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function MainWrapper({ children }: WrapperProps) {
  return (
    <main id="MainWrapper" className="main-wrapper">
      {children}
    </main>
  );
}
