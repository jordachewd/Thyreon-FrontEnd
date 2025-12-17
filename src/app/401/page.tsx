import AdminWrapper from "@/components/layout/wrappers/AdminWrapper";
import ErrorCard from "@/components/shared/ErrorCard";

export default function Unauthorized() {
  return (
    <AdminWrapper role="lite">
      <ErrorCard
        title="401 Unauthorized"
        error="You do not have permission to access this resource."
      />
    </AdminWrapper>
  );
}
