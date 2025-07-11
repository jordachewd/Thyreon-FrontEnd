import AdminWrapper from "@/components/layout/admin/AdminWrapper";
import ErrorCard from "@/components/shared/ErrorCard";

const UnauthorizedPage = () => {
  return (
    <AdminWrapper>
      <ErrorCard
        title="Page Not Found!"
        error="The page you are looking for does not exist."
      />
    </AdminWrapper>
  );
};

export default UnauthorizedPage;
