import AdminWrapper from "@/components/layout/wrappers/AdminWrapper";
import MainWrapper from "@/components/layout/wrappers/MainWrapper";
import ErrorCard from "@/components/shared/ErrorCard";

export default function NotFound() {
  return (
    <MainWrapper>
      <AdminWrapper>
        <ErrorCard
          title="Page Not Found!"
          error="The page you are looking for does not exist."
        />
      </AdminWrapper>
    </MainWrapper>
  );
}
