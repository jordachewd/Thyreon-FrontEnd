import "@/app/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import MainWrapper from "@/components/layout/MainWrapper";
import WPGuardProvider from "@/components/layout/WPGuardProvider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#111627", // midnight-700
        },
        elements: {
          formButtonPrimary: "bg-midnight-700 hover:bg-midnight-900",
          footerActionLink: "text-leafGreen-500 hover:text-leafGreen-800",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <AppRouterCacheProvider>
            <InitColorSchemeScript attribute="data-wpguard-theme" />
            <WPGuardProvider>
              <MainWrapper>{children}</MainWrapper>
            </WPGuardProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
