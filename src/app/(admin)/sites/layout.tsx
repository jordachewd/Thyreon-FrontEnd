import SitesFrame from "@/components/layout/admin/SitesFrame";
import { sitesNavItems } from "@/constants/layout/sites-nav.const";

type SitesLayoutProps = {
  children: React.ReactNode;
  registry: React.ReactNode;
  updates: React.ReactNode;
  backups: React.ReactNode;
  security: React.ReactNode;
};

export default function SitesLayout(props: SitesLayoutProps) {
  const { children, ...slots } = props;
  return <SitesFrame tabs={sitesNavItems} slots={slots} overview={children} />;
}
