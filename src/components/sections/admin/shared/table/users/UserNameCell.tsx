import Link from "next/link";
import css from "@/styles/layout/admin/users/UserNameCell.module.css";
import Avatar from "@mui/material/Avatar";
import { memo } from "react";

interface UserNameProps {
  href: string;
  image: string;
  username: string;
  firstname: string;
  lastname?: string;
  noImage?: boolean;
}

function UserNameCell({
  href,
  image,
  username,
  firstname,
  lastname = "",
  noImage = false,
}: UserNameProps) {
  return (
    <div className={css.wrapper}>
      <Link href={href} className={css.link}>
        {!noImage && (
          <Avatar
            alt={username}
            src={image}
            sx={{
              width: 32,
              height: 32,
              boxShadow: 0,
            }}
          />
        )}

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

export default memo(UserNameCell);
