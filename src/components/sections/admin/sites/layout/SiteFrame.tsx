"use client";

import {
  SiteNavItemType,
  SiteSlotKey,
} from "@/constants/layout/sites-nav.const";
import css from "@/styles/layout/admin/sites/SiteFrame.module.css";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import SiteFrameHeader from "./SiteFrameHeader";
import SiteFrameSidebar from "./SiteFrameSidebar";

export default function SiteFrame({
  tabs,
  slots,
  overview,
  pageId,
}: {
  tabs: ReadonlyArray<SiteNavItemType>;
  slots: Record<SiteSlotKey, React.ReactNode>;
  overview: React.ReactNode;
  pageId: string;
}) {
  const pathname = usePathname();
  const active = useCallback(() => {
    const parts = pathname.replace(/\/+$/, "").split("/");
    return parts[3] ?? null;
  }, [pathname])();

  const pagePath = `/sites/${pageId}`;

  return (
    <div className={css.wrapper}>
      <SiteFrameHeader siteId={Number(pageId)} className={css.header} />
      <SiteFrameSidebar
        className={css.sidebar}
        tabs={tabs}
        active={active}
        pagePath={pagePath}
      />

      <main className={css.content}>
        {!active ? overview : slots[active as SiteSlotKey]}
      </main>
    </div>
  );
}
