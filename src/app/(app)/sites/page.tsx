import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import AddSiteDialog from "@/components/sections/admin/sites/dialogs/AddSiteDialog";
import SitesPage from "@/components/sections/admin/sites/SitesPage";

export default function AppSites() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Websites" alignTitle="left">
        <AddSiteDialog />
      </PageHead>
      <SitesPage />
    </PageWrapper>
  );
}
