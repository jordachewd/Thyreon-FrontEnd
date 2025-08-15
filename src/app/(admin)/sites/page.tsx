import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import AddSiteDialog from "@/components/sections/admin/sites/dialogs/AddSiteDialog";
import Sites from "@/components/sections/admin/sites/Sites";

export default function SitesPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Websites" alignTitle="left">
        <AddSiteDialog />
      </PageHead>
      <Sites />
    </PageWrapper>
  );
}
