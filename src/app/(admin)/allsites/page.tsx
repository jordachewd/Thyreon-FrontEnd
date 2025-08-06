import PageHead from "@/components/layout/common/PageHead";
import SitesPage from "@/components/sections/admin/sites/SitesPage";

export default async function AdminAllSites() {
  return (
    <>
      <PageHead title="All Sites" alignTitle="left" />
      <SitesPage />
    </>
  );
}
