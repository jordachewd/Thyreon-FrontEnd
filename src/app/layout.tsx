import "@/app/globals.css";
import WPGuardProvider from "@/components/layout/providers/WPGuardProvider";
import { clerkAppearance } from "@/constants/layout/clerk-appearance.const";
import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { InitColorSchemeScript } from "@mui/material";
import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata: Metadata = {
  title: "WPGuard | Maintenance & Monitoring",
  description:
    "Keep your WordPress website fast, secure, and up-to-date with WPGuard. " +
    "Automated checks, smart alerts, and effortless fixes—so your site runs smooth, always.",
};

export const viewport: Viewport = {
  themeColor: "dark",
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <body>
          <AppRouterCacheProvider>
            <InitColorSchemeScript attribute="data-wpguard-theme" />
            <WPGuardProvider>{children}</WPGuardProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
