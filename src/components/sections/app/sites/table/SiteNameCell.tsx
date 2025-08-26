import Link from "next/link";
import css from "@/styles/layout/admin/users/UserNameCell.module.css";
import { memo } from "react";

interface SiteNameProps {
  href: string;
  name: string;
  domain: string;
}

function SiteNameCell({ href, name, domain }: SiteNameProps) {
  return (
    <div className={css.wrapper}>
      <Link href={href} className={css.link}>
        <div className={css.text}>
          <span className={css.name}>{name}</span>
          <span className={css.username}>@{domain}</span>
        </div>
      </Link>
    </div>
  );
}

export default memo(SiteNameCell);
