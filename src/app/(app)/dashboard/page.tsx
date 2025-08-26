import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import DashboardPage from "@/components/sections/app/dashboard/DashboardPage";

export default function AppDashboard() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Dashboard" alignTitle="left" />
      <DashboardPage />
    </PageWrapper>
  );
}
