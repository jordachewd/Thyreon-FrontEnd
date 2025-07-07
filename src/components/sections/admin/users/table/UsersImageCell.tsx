import Link from "next/link";
//import Avatar from "@mui/material/Avatar";

interface UsersImageProps {
  alt?: string;
  src?: string | null;
  href: string;
}

export default function UsersImageCell({ href }: UsersImageProps) {
  return (
    <Link href={href}>
      IMG
      {/*       <Avatar
        alt={alt}
        src={`${src}`}
        sx={{ width: 32, height: 32, borderWidth: 2, borderColor: "#f05722" }}
      /> */}
    </Link>
  );
}
