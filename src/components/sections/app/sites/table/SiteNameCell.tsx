import Link from "next/link";
import { memo } from "react";

interface SiteNameProps {
  href: string;
  name: string;
  domain: string;
}

function SiteNameCell({ href, name, domain }: SiteNameProps) {
  return (
    <div className="site-name-wrapper">
      <Link href={href} className="site-name-link">
        <div className="site-name-text">
          <span className="site-name">{name}</span>
          <span className="site-username">@{domain}</span>
        </div>
      </Link>
    </div>
  );
}

export default memo(SiteNameCell);
