import AdminWrapper from "@/components/layout/wrappers/AdminWrapper";
import ErrorCard from "@/components/shared/ErrorCard";

export default function PageNotFound() {
  return (
    <AdminWrapper>
      <ErrorCard
        title="404 Not Found"
        error="The page you are looking for does not exist."
      />
    </AdminWrapper>
  );
}
