"use client";

import {
  SiteNavItemType,
} from "@/constants/layout/sites-nav.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { usePathname } from "next/navigation";
import { ReactNode, memo } from "react";
import SiteFrameHeader from "./SiteFrameHeader";
import SiteFrameSidebar from "./SiteFrameSidebar";

function SiteFrameClient({
  tabs,
  site,
  siteId,
  children,
}: {
  tabs: ReadonlyArray<SiteNavItemType>;
  site: GetSiteData;
  siteId: number;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const parts = pathname.replace(/\/+$/, "").split("/");
  const active = parts[3] ?? null;
  const pagePath = `/sites/${siteId}`;

  return (
    <div className="site-frame-wrapper">
      <SiteFrameHeader site={site} siteId={siteId} className="site-frame-header" />
      <SiteFrameSidebar
        className="site-frame-sidebar"
        tabs={tabs}
        active={active}
        pagePath={pagePath}
      />

      <main className="site-frame-content">
        {children}
      </main>
    </div>
  );
}

export default memo(SiteFrameClient);
