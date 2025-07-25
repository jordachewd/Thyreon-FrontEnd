import Link from "next/link";
import css from "./UsersNameCell.module.css";
import { memo } from "react";
import Avatar from "@mui/material/Avatar";

interface UsersNameProps {
  href: string;
  image: string;
  username: string;
  firstname: string;
  lastname?: string;
}

function UsersNameCell({
  href,
  image,
  username,
  firstname,
  lastname = "",
}: UsersNameProps) {
  return (
    <div className={css.wrapper}>
      <Link href={href} className={css.link}>
        <Avatar
          alt={username}
          src={image}
          sx={{
            width: 32,
            height: 32,
            boxShadow: 0,
          }}
        />
        <div className={css.text}>
          <span className={css.name}>
            {firstname} {lastname}
          </span>
          <span className={css.username}>@{username}</span>
        </div>
      </Link>
    </div>
  );
}

export default memo(UsersNameCell);
