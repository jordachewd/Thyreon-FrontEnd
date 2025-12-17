import { Button, Typography } from "@/components/ui";

interface ErrorCardProps {
  error: string;
  title?: string;
  message?: string;

  mini?: boolean;
  onCloseMini?: () => void;
  color?: "error" | "warning" | "info";
}

export default function ErrorCard({
  error,
  title,
  message = "Please contact your administrator if you believe this is unusual.",
  mini = false,
  onCloseMini,
  color = "error",
}: ErrorCardProps) {
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

  if (mini)
    return (
      <div className={`flex rounded-md ${miniCardCss} ${cardColor}`}>
        <i className={`bi ${cardIcon} text-2xl text-white leading-none`}></i>
        <div className="flex flex-col">
          <Typography variant="body2" className="text-white">
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
            className="absolute top-1/2 right-0 -translate-y-1/2 min-w-0 leading-none"
          >
            <i className="bi bi-x text-lg text-white"></i>
          </Button>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-full">
      {title && <Typography variant="h3">{title}</Typography>}
      <div className={`flex rounded-md ${bigCardCss} ${cardColor}`}>
        <i className={`bi ${cardIcon} text-6xl text-white leading-none`}></i>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" className="text-white">
            {error}
          </Typography>
          {message && (
            <Typography variant="body2" className="text-white italic">
              {message}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
