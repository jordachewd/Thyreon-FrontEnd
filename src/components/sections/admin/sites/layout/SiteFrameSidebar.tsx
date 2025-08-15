import { SiteNavItemType } from "@/constants/layout/sites-nav.const";
import css from "@/styles/layout/admin/sites/SiteFrameNav.module.css";
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
      <nav className={css.nav}>
        <Link
          prefetch={false}
          href={pagePath}
          className={!active ? css.activeTab : ""}
        >
          <span>Overview</span>
          {!active && <i className="bi bi-arrow-right"></i>}
        </Link>

        {tabs.map((tab) => (
          <Link
            key={tab.slug}
            href={`${pagePath}/${tab.slug}`}
            prefetch={false}
            className={active === tab.slug ? css.activeTab : ""}
          >
            <span> {tab.label}</span>
            {active === tab.slug && <i className="bi bi-arrow-right"></i>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
