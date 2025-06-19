"use client";
import AdminWrapper from "@/components/admin/AdminWrapper";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();
  return (
    <AdminWrapper>
      <Typography variant="h1">Unauthorized</Typography>
      <div className="flex flex-col items-center gap-2 bg-red-800 p-8 rounded-xl shadow-lg">
        <Typography variant="h6">
          You do not have the necessary permissions to access this page.
        </Typography>

        <Typography variant="body2">
          Please contact your administrator if you believe this is an error.
        </Typography>
      </div>

      <Button variant="contained" size="small" onClick={() => router.push("/")}>
        Go Back
      </Button>
    </AdminWrapper>
  );
};

export default UnauthorizedPage;
