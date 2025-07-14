"use client";

import css from "@/styles/shared/PageHead.module.css";
import { useAuth } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import { useEffect } from "react";

interface PageHeadProps {
  title: string;
  subtitle?: string | null;
  alignTitle?: "left" | "center" | "right";
  alignSubtitle?: "left" | "center" | "right";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: React.ReactNode;
}

export default function PageHead({
  title,
  subtitle,
  children,
  size = "h4",
  alignTitle = "center",
  alignSubtitle = "center",
}: PageHeadProps) {
  /** For development purpose - To Be Removed  */
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    console.log("PageHead - isLoaded:", isLoaded, "isSignedIn:", isSignedIn);
    const logToken = async () => {
      if (isLoaded && isSignedIn) {
        const token = await getToken();
        console.log("--- Clerk Session JWT (Copy this for Swagger UI) ---");
        console.log(token);
        console.log("--------------------------------------------------");
      }
    };
    logToken();
  }, [isLoaded, isSignedIn, getToken]);
  /* END PageHead */

  return (
    <div className={css.section}>
      <div className={css.title}>
        <Typography variant={size} align={alignTitle}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" align={alignSubtitle}>
            {subtitle}
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
}
