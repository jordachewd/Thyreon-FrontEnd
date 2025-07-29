"use client";
import Link from "next/link";
import { memo } from "react";
import { MenuItem } from "@mui/material";
import TableActions from "@/components/sections/admin/shared/table/TableActions";

interface UsersActionProps {
  href: string;
}

function UsersActions({ href }: UsersActionProps) {
  return (
    <TableActions>
      <MenuItem>
        <Link href={href}>
          <i className="bi bi-eye"></i>
          <span className="!ml-4">View</span>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href={href}>
          <i className="bi bi-pen"></i>
          <span className="!ml-4">Edit</span>
        </Link>
      </MenuItem>
    </TableActions>
  );
}
export default memo(UsersActions);
