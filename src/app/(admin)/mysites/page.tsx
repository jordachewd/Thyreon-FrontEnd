import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import AddSiteDialog from "@/components/sections/admin/sites/dialogs/AddSiteDialog";
import SitesPage from "@/components/sections/admin/sites/SitesPage";

export default async function AdminMySites() {
  return (
    <PageWrapper>
      <PageHead title="My Sites" alignTitle="left">
        <AddSiteDialog />
      </PageHead>
      <SitesPage />
    </PageWrapper>
  );
}
