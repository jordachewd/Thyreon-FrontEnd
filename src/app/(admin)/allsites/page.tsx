import PageHead from "@/components/layout/common/PageHead";
import AllSites from "@/components/sections/admin/sites/AllSites";

export default async function AdminMonitoring() {
  return (
    <>
      <PageHead title="All Sites" alignTitle="left" />
      <AllSites />
    </>
  );
}
