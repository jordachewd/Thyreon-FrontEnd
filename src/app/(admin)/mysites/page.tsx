import PageHead from "@/components/layout/common/PageHead";
import AddSiteDialog from "@/components/sections/admin/sites/dialogs/AddSiteDialog";
import SitesPage from "@/components/sections/admin/sites/SitesPage";

export default async function AdminMonitoring() {
  return (
    <>
      <PageHead title="My Sites" alignTitle="left">
        <AddSiteDialog />
      </PageHead>

      <SitesPage />
    </>
  );
}
