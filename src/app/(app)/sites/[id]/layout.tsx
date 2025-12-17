import SiteFrameClient from "@/components/sections/app/sites/layout/SiteFrameClient";
import { sitesNavItems } from "@/constants/layout/sites-nav.const";
import getSiteById from "@/lib/actions/sites/get-site-by-id";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const siteId = Number(id);

  if (isNaN(siteId)) {
    notFound();
  }

  const { success, site } = await getSiteById(siteId);

  if (!success || !site) {
    notFound();
  }

  return (
    <SiteFrameClient tabs={sitesNavItems} site={site} siteId={siteId}>
      {children}
    </SiteFrameClient>
  );
}
