import EditSitePage from "@/components/sections/admin/sites/EditSitePage";

interface SitePageProps {
  params: Promise<{ id: string }>;
}

export default async function SitePage({ params }: SitePageProps) {
  const { id } = await params;
  return <EditSitePage siteId={Number(id)} />;
}
