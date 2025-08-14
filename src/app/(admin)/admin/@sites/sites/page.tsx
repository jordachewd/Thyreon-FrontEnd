import PageHead from "@/components/layout/common/PageHead";
import Sites from "@/components/sections/admin/sites/Sites";

export default function AdminSitesPage() {
  return (
    <>
      <PageHead title="Sites" alignTitle="left" />
      <Sites isAdmin />
    </>
  );
}
