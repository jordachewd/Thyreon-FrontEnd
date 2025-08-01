"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

interface ErrorCardProps {
  error: string;
  title?: string;
  message?: string;
  backToUrl?: string;
  mini?: boolean;
  color?: "error" | "warning" | "info";
}

function ErrorCard({
  error,
  title,
  message = "Please contact your administrator if you believe this is unusual.",
  backToUrl = "dashboard",
  mini = false,
  color = "error",
}: ErrorCardProps) {
  const router = useRouter();
  const miniCardCss = "w-full !px-2 !py-1 !my-3 gap-3 items-center";
  const bigCardCss = "items-center !py-8 !px-12 gap-4 w-full lg:max-w-1/3";

  let cardColor = "bg-red-600";
  let cardIcon = "bi-x-circle";
  switch (color) {
    case "warning":
      cardColor = "bg-orange-600";
      cardIcon = "bi-exclamation-circle";
      break;
    case "info":
      cardColor = "bg-blue-600";
      cardIcon = "bi-info-circle";
      break;
  }

  const handleRouterPush = useCallback(
    (url: string) => {
      if (!url) return;
      router.push(`/${url}`);
    },
    [router]
  );

  if (mini)
    return (
      <div className={`flex rounded-md ${miniCardCss} ${cardColor}`}>
        <i className={`bi ${cardIcon} text-lg text-white`}></i>
        <div className="flex flex-col">
          <Typography
            variant="body2"
            color="white"
            className="!font-semibold !wrap-break-word"
          >
            {title ? title + ": " : ""}
            {error}
          </Typography>

          {message && (
            <span className="text-white italic textxxs">{message}</span>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
      {title && <Typography variant="h3">{title}</Typography>}
      <div className={`flex flex-col rounded-md ${bigCardCss} ${cardColor}`}>
        <Typography
          variant="h4"
          color="white"
          className="!wrap-break-word text-center"
        >
          {error}
        </Typography>
        {message && (
          <Typography variant="body2" color="white" className="italic">
            {message}
          </Typography>
        )}
      </div>
      {backToUrl && (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleRouterPush(backToUrl)}
        >
          Back to {backToUrl}
        </Button>
      )}
    </div>
  );
}

export default memo(ErrorCard);
