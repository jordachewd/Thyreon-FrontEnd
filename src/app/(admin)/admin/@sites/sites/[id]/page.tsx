import PageWrapper from "@/components/layout/common/PageWrapper";
import AdminSiteInfo from "@/components/sections/admin/sites/AdminSiteInfo";

interface SiteProfileProps {
  params: Promise<{ id: string }>;
}

export default async function AdminSectionSitePage({
  params,
}: SiteProfileProps) {
  const { id } = await params;
  return (
    <PageWrapper className="gap-8">
      <AdminSiteInfo siteId={Number(id)} />
    </PageWrapper>
  );
}
