import PageHead from "@/components/layout/common/PageHead";
import AddSiteDialog from "@/components/sections/admin/sites/dialogs/AddSiteDialog";
import MySites from "@/components/sections/admin/sites/MySites";

export default async function AdminMonitoring() {
  return (
    <>
      <PageHead title="My Sites" alignTitle="left">
        <AddSiteDialog />
      </PageHead>

      <MySites />
    </>
  );
}
