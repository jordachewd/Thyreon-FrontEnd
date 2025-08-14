import PageHead from "@/components/layout/common/PageHead";
import AddSiteDialog from "@/components/sections/admin/sites/dialogs/AddSiteDialog";
import Sites from "@/components/sections/admin/sites/Sites";

export default function SitesRegistryPage() {
  return (
    <>
      <PageHead title="Sites Registry" alignTitle="left">
        <AddSiteDialog />
      </PageHead>
      <Sites />
    </>
  );
}
