import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import Sites from "@/components/sections/admin/sites/Sites";

export default function AdminSectionSitesPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="All Sites" alignTitle="left" />
      <Sites isAdmin />
    </PageWrapper>
  );
}
