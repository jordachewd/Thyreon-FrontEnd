import Link from "next/link";
import { Avatar } from "@/components/ui";

type UserNameProps = {
  href: string;
  image: string;
  username: string;
  firstname: string;
  lastname?: string;
  noImage?: boolean;
};

export default function UserNameCell({
  href,
  image,
  username,
  firstname,
  lastname = "",
  noImage = false,
}: UserNameProps) {
  return (
    <div className="user-name-wrapper">
      <Link href={href} className="user-name-link">
        {!noImage && <Avatar alt={username} src={image} />}

        <div className="user-name-text">
          <span className="user-name">
            {firstname} {lastname}
          </span>
          <span className="user-username">@{username}</span>
        </div>
      </Link>
    </div>
  );
}
