import AdminWrapper from "@/components/layout/admin/AdminWrapper";
import ErrorCard from "@/components/shared/ErrorCard";

const UnauthorizedPage = () => {
  return (
    <AdminWrapper>
      <ErrorCard
        title="Unauthorized"
        error="You do not have the necessary permissions to access this page."
      />
    </AdminWrapper>
  );
};

export default UnauthorizedPage;
