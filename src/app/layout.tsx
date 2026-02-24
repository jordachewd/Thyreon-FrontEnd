import WPGuardProvider from "@/components/layout/providers/WPGuardProvider";
import { clerkAppearance } from "@/constants/layout/clerk-appearance.const";
import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { InitColorSchemeScript } from "@mui/material";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const viewport: Viewport = {
  themeColor: "dark",
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Thyreon | WordPress Maintenance Made Easy",
  description:
    "Keep your WordPress website fast, secure, and up-to-date with Thyreon. " +
    "Automated checks, smart alerts, and effortless fixes—so your site runs smooth, always.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <body>
          <AppRouterCacheProvider>
            <InitColorSchemeScript attribute="data-thyreon-theme" />
            <WPGuardProvider>{children}</WPGuardProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
