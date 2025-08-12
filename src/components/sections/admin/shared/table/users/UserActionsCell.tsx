import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GetUserData } from "@/types/users/get-user-data.d";
import IconButton from "@mui/material/IconButton";
import { GridRenderCellParams } from "@mui/x-data-grid";
import Link from "next/link";
import { memo } from "react";

type UserActionsCellProps = {
  params: GridRenderCellParams;
  onEdit: (userData: GetUserData) => void;
  onRemove: (userData: GetUserData) => void;
};

function UserActionsCell({ params, onEdit, onRemove }: UserActionsCellProps) {
  const isAdmin = params.row.role === "admin";
  return (
    <div className="flex gap-2 items-center">
      <TooltipArrow title="View" placement="bottom">
        <IconButton sx={{ p: 0.5, backgroundColor: "transparent!important" }}>
          <Link href={`users/${params.row.id}`} className="flex">
            <i className="bi bi-eye text-xs"></i>
          </Link>
        </IconButton>
      </TooltipArrow>

      <TooltipArrow title="Quick Edit" placement="bottom">
        <IconButton
          sx={{ p: 0.5, backgroundColor: "transparent!important" }}
          onClick={() => onEdit(params.row)}
        >
          <i className="bi bi-pen text-xs"></i>
        </IconButton>
      </TooltipArrow>

      <TooltipArrow
        title={isAdmin ? "Admin users cannot be deleted" : "Delete"}
        placement="bottom"
      >
        {isAdmin ? (
          <i className="bi bi-trash3 text-xs text-slate-400"></i>
        ) : (
          <IconButton
            sx={{ p: 0.5, backgroundColor: "transparent!important" }}
            onClick={() => onRemove(params.row)}
          >
            <i className="bi bi-trash3 text-xs"></i>
          </IconButton>
        )}
      </TooltipArrow>
    </div>
  );
}

export default memo(UserActionsCell);
