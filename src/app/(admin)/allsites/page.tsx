import PageHead from "@/components/layout/common/PageHead";
import AllSitesPage from "@/components/sections/admin/sites/AllSitesPage";

export default async function AdminMonitoring() {
  return (
    <>
      <PageHead title="All Sites" alignTitle="left" />
      <AllSitesPage />
    </>
  );
}
