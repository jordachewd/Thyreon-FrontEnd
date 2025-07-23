import Link from "next/link";
import css from "./UsersNameCell.module.css";
import { memo } from "react";

interface UsersNameProps {
  href: string;
  username: string;
  firstname: string;
  lastname?: string;
}

function UsersNameCell({
  href,
  username,
  firstname,
  lastname = "",
}: UsersNameProps) {
  return (
    <div className={css.wrapper}>
      <Link href={href} className={css.link}>
        <span className={css.name}>
          {firstname} {lastname}
        </span>
        <span className={css.username}>@{username}</span>
      </Link>
    </div>
  );
}

export default memo(UsersNameCell);
