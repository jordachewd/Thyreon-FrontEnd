import PageHead from "@/components/layout/common/PageHead";
import SitesPage from "@/components/sections/admin/sites/SitesPage";

export default function AdminSitesPage() {
  return (
    <>
      <PageHead title="Sites" alignTitle="left" />
      <SitesPage isAdmin />
    </>
  );
}
