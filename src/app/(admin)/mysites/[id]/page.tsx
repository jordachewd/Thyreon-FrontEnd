import PageWrapper from "@/components/layout/common/PageWrapper";
import EditSitePage from "@/components/sections/admin/sites/EditSitePage";

interface SiteProfileProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMySiteProfile({ params }: SiteProfileProps) {
  const { id } = await params;
  return (
    <PageWrapper>
      <EditSitePage siteId={Number(id)} />
    </PageWrapper>
  );
}
