"use client";

import SiteFrame from "@/components/sections/admin/sites/layout/SiteFrame";
import { sitesNavItems } from "@/constants/layout/sites-nav.const";
import { useParams } from "next/navigation";

type SitesLayoutProps = {
  children: React.ReactNode;
  info: React.ReactNode;
  health: React.ReactNode;
  reports: React.ReactNode;
  backups: React.ReactNode;
  security: React.ReactNode;
  updates: React.ReactNode;
  settings: React.ReactNode;
};

export default function SiteLayout(props: SitesLayoutProps) {
  const { children, ...slots } = props;
  const { id } = useParams<{ id: string }>();
  return (
    <SiteFrame
      tabs={sitesNavItems}
      slots={slots}
      overview={children}
      pageId={id}
    />
  );
}
