import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import SitesPage from "@/components/sections/app/sites/SitesPage";

export default function AdminSectionSitesPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="All Sites" alignTitle="left" />
      <SitesPage isAdminPage />
    </PageWrapper>
  );
}
