import Link from "next/link";
import Avatar from "@mui/material/Avatar";

interface UsersImageProps {
  alt?: string;
  src?: string;
  href: string;
}

export default function UsersImageCell({
  href,
  src,
  alt = "User Avatar",
}: UsersImageProps) {
  return (
    <Link href={href}>
      {src ? (
        <Avatar
          alt={alt}
          src={src}
          sx={{ width: 32, height: 32, borderWidth: 2, borderColor: "#f05722" }}
        />
      ) : (
        <p>No Image Yet</p>
      )}
    </Link>
  );
}
