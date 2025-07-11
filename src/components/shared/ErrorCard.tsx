"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

interface ErrorCardProps {
  title?: string;
  error?: string;
  message?: string;
  backToUrl?: string;
}

export default function ErrorCard({
  title = "Unauthorized Access!",
  error = "You do not have the necessary permissions to access this page.",
  message = "Please contact your administrator if you believe this is unusual.",
  backToUrl = "dashboard",
}: ErrorCardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full">
      <Typography variant="h2">{title}</Typography>
      <div className="flex flex-col items-center gap-2 bg-red-600 py-6 px-12 rounded-xl shadow-lg">
        <Typography variant="h5" color="white">
          {error}
        </Typography>

        <Typography variant="body2" color="white">
          {message}
        </Typography>
      </div>

      <Button
        size="small"
        variant="contained"
        onClick={() => router.push(`/${backToUrl}`)}
        className="!px-6"
      >
        Back to {backToUrl}
      </Button>
    </div>
  );
}
