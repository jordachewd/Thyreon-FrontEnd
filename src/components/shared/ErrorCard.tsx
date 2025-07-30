"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

interface ErrorCardProps {
  error: string;
  title?: string;
  message?: string;
  backToUrl?: string;
  mini?: boolean;
}

export default function ErrorCard({
  error,
  title = "Error",
  message = "Please contact your administrator if you believe this is unusual.",
  backToUrl = "dashboard",
  mini = false,
}: ErrorCardProps) {
  const router = useRouter();

  if (mini)
    return (
      <div className="flex flex-col w-full !px-2 !py-1 !my-3 bg-red-600 rounded-md">
        <div className="flex gap-2 items-center">
          <Typography variant="body2" color="white" className="!font-semibold !wrap-break-word">
            {title ? title + ": " : ""}
            {error}
          </Typography>
        </div>
        {message && (
          <span className="text-white italic textxxs">{message}</span>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
      {title && <Typography variant="h3">{title}</Typography>}
      <div className="flex flex-col items-center gap-2 bg-red-600 !py-6 !px-12 rounded-xl shadow-lg">
        <Typography variant="h6" color="white" className="!wrap-break-word">
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
          variant="contained"
          onClick={() => router.push(`/${backToUrl}`)}
          className="px-6! mt-4!"
        >
          Back to {backToUrl}
        </Button>
      )}
    </div>
  );
}
