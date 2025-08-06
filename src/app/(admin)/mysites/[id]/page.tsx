import EditSitePage from "@/components/sections/admin/sites/EditSitePage";

interface SiteProfileProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMySiteProfile({ params }: SiteProfileProps) {
  const { id } = await params;
  return <EditSitePage siteId={Number(id)} />;
}
