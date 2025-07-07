"use client";
import Link from "next/link";
import { MenuItem } from "@mui/material";
import UserActionsMenu from "./UserActionsMenu";

interface UsersActionProps {
  href: string;
}

export default function UsersActionsCell({ href }: UsersActionProps) {
  return (
    <>
      <UserActionsMenu>
        <MenuItem>
          <Link href={href}>
            <i className="bi bi-eye"></i>
            <span className="ml-4">View</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={href}>
            <i className="bi bi-pen"></i>
            <span className="ml-4">Edit</span>
          </Link>
        </MenuItem>
      </UserActionsMenu>
    </>
  );
}
