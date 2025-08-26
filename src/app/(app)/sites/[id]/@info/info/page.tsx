"use client";

import PageWrapper from "@/components/layout/common/PageWrapper";
import SiteInfo from "@/components/sections/app/sites/SiteInfo";
import { useParams } from "next/navigation";

export default function AppSiteInfo() {
  const { id } = useParams<{ id: string }>();
  return (
    <PageWrapper className="gap-8">
      <SiteInfo siteId={Number(id)} />
    </PageWrapper>
  );
}
