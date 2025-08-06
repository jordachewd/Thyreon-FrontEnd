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
  onCloseMini?: () => void;
  color?: "error" | "warning" | "info";
}

function ErrorCard({
  error,
  title,
  message = "Please contact your administrator if you believe this is unusual.",
  backToUrl = "dashboard",
  mini = false,
  onCloseMini,
  color = "error",
}: ErrorCardProps) {
  const router = useRouter();

  const miniExtraCss = onCloseMini ? "!pr-14" : "";
  const bigCardCss = "w-full lg:max-w-1/2 !py-8 !px-12 gap-10 items-center";
  const miniCardCss = `w-full !px-2 !py-1 !my-4 gap-3 items-center relative ${miniExtraCss}`;

  let cardColor = "bg-red-600";
  let cardIcon = " bi-patch-exclamation";
  switch (color) {
    case "warning":
      cardColor = "bg-orange-600";
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
        <i className={`bi ${cardIcon} text-2xl text-white leading-none`}></i>
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
            <span className="text-white italic text-xs">{message}</span>
          )}
        </div>
        {onCloseMini && (
          <Button
            size="small"
            variant="text"
            onClick={onCloseMini}
            sx={{
              minWidth: "unset",
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              lineHeight: 0,
            }}
          >
            <i className="bi bi-x text-lg text-white"></i>
          </Button>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
      {title && <Typography variant="h3">{title}</Typography>}
      <div className={`flex rounded-md ${bigCardCss} ${cardColor}`}>
        <i className={`bi ${cardIcon} text-6xl text-white leading-none`}></i>
        <div className="flex flex-col gap-2">
          <Typography
            variant="h5"
            color="white"
            className="!wrap-break-word !leading-none"
          >
            {error}
          </Typography>
          {message && (
            <Typography variant="body2" color="white" className="italic">
              {message}
            </Typography>
          )}
        </div>
      </div>
      {backToUrl && (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleRouterPush(backToUrl)}
          startIcon={<i className="bi bi-arrow-90deg-left text-xs"></i>}
        >
          Back to {backToUrl}
        </Button>
      )}
    </div>
  );
}

export default memo(ErrorCard);
