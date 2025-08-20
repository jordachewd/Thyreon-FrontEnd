import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import DashboardPage from "@/components/sections/admin/dashboard/DashboardPage";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { Suspense } from "react";

export default function AdminDashboard() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Dashboard" alignTitle="left" />
      <Suspense fallback={<LoadingBubbles wrapped />}>
        <DashboardPage />
      </Suspense>
    </PageWrapper>
  );
}
