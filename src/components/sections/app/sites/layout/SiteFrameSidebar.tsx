import { SiteNavItemType } from "@/constants/layout/sites-nav.const";
import Link from "next/link";

type SiteFrameSidebarProps = {
  tabs: ReadonlyArray<SiteNavItemType>;
  active: string | null;
  pagePath: string;
  className?: string;
};

export default function SiteFrameSidebar(props: SiteFrameSidebarProps) {
  const { className: style, tabs, active, pagePath } = props;
  return (
    <aside className={style}>
      <nav className="site-frame-nav">
        <Link
          prefetch={false}
          href={pagePath}
          className={!active ? "site-frame-active-tab" : ""}
        >
          <span>Overview</span>
          {!active && <i className="bi bi-arrow-right"></i>}
        </Link>

        {tabs.map((tab) => (
          <Link
            key={tab.slug}
            href={`${pagePath}/${tab.slug}`}
            prefetch={false}
            className={active === tab.slug ? "site-frame-active-tab" : ""}
          >
            <span> {tab.label}</span>
            {active === tab.slug && <i className="bi bi-arrow-right"></i>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
