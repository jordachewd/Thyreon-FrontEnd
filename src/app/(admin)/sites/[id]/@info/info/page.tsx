"use client";

import PageWrapper from "@/components/layout/common/PageWrapper";
import SiteInfo from "@/components/sections/admin/sites/SiteInfo";
import { useParams } from "next/navigation";

export default function SiteInfoPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <PageWrapper className="gap-8">
      <SiteInfo siteId={Number(id)} />
    </PageWrapper>
  );
}
