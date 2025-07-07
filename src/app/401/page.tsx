"use client";
import AdminWrapper from "@/components/layout/admin/AdminWrapper";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();
  return (
    <AdminWrapper>
      <div className="flex flex-col items-center justify-center gap-8 w-full h-full">
        <Typography variant="h1">Unauthorized</Typography>
        <div className="flex flex-col items-center gap-2 bg-red-800 p-8 rounded-xl shadow-lg">
          <Typography variant="h6">
            You do not have the necessary permissions to access this page.
          </Typography>

          <Typography variant="body2">
            Please contact your administrator if you believe this is an error.
          </Typography>
        </div>

        <Button
          variant="contained"
          size="small"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </AdminWrapper>
  );
};

export default UnauthorizedPage;
