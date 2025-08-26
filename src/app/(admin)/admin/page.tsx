import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import DashboardPage from "@/components/sections/app/dashboard/DashboardPage";

export default function AdminOverview() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Admin Overview" alignTitle="left" />
      <DashboardPage />
    </PageWrapper>
  );
}
