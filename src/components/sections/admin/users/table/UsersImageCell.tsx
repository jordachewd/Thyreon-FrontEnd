import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { memo } from "react";

interface ImgCellProps {
  href: string;
  src?: string;
  alt?: string;
}

function UsersImageCell({ href, src, alt = "User Avatar" }: ImgCellProps) {
  return (
    <Link href={href}>
      {src ? (
        <Avatar
          alt={alt}
          src={src}
          sx={{
            width: 32,
            height: 32,
            boxShadow: 0,
          }}
        />
      ) : (
        <p>No Image Yet</p>
      )}
    </Link>
  );
}

export default memo(UsersImageCell);
