import PageWrapper from "@/components/layout/common/PageWrapper";
import SiteInfo from "@/components/sections/app/sites/SiteInfo";

export default async function SiteInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <PageWrapper className="gap-8">
      <SiteInfo siteId={Number(id)} />
    </PageWrapper>
  );
}
