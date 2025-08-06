"use client";

import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/UserNameCell";
import { Chip, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { UserRoleColors } from "@/types/users/user-role-colors.interface";
import { userRolesColors } from "@/constants/users/defaults/user-roles-colors";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import Link from "next/link";
import { GetUserData } from "@/types/users/get-user-data.d";

interface UsersTableColumnsProps {
  onEditUser: (userData: GetUserData) => void;
  onDeleteUser: (userData: GetUserData) => void;
}

export const usersTableColumns = ({
  onEditUser,
  onDeleteUser,
}: UsersTableColumnsProps): GridColDef[] => [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    display: "flex",
    align: "center",
    flex: 0.25,
    renderCell: (params: GridRenderCellParams) => {
      return <span className="text-xs">{params.row.id}</span>;
    },
  },
  {
    field: "username",
    headerName: "Account",
    flex: 1.5,
    display: "flex",

    renderCell: (params: GridRenderCellParams) => (
      <UsersNameCell
        href={`users/${params.row.id}`}
        image={params.row.clerkImg}
        username={params.row.username}
        firstname={params.row.firstName}
        lastname={params.row.lastName}
      />
    ),
  },

  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    display: "flex",
    renderCell: (params: GridRenderCellParams) => {
      return <span className="text-sm">{params.row.email}</span>;
    },
  },
  {
    field: "plan",
    headerName: "Plan",
    flex: 2,
    display: "flex",
    renderCell: (params: GridRenderCellParams) => {
      const currentPlan = params.row.currentPlan;
      const planName = currentPlan?.plan || "Lite";
      const expiresAt = currentPlan?.expiresAt;
      const planUntil = expiresAt
        ? "Until: " + getFormattedDate(currentPlan?.expiresAt)
        : "N/A";
      return (
        <div className="flex flex-col">
          <span className="text-sm capitalize font-semibold">{planName}</span>
          <span className="text-xs text-slate-400">{planUntil}</span>
        </div>
      );
    },
  },
  {
    field: "sites",
    headerName: "Sites",
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      const sitesLength = params.row.sites?.length || 0;
      const role = params.row.role as keyof UserRoleColors;
      return (
        <Chip size="small" label={sitesLength} color={userRolesColors[role]} />
      );
    },
  },

  {
    field: "state",
    headerName: "State",
    display: "flex",
    flex: 1,
    renderCell: () => {
      return <span className="textxxs">Active / Logged Out</span>;
    },
  },

  {
    field: "createdAt",
    headerName: "Member Since",
    flex: 1,
    display: "flex",
    renderCell: (params: GridRenderCellParams) => {
      const createdAt = getFormattedDate(params.row.createdAt);
      return <span className="text-xs">{createdAt}</span>;
    },
  },
  {
    field: "role",
    headerName: "Role",
    align: "center",
    headerAlign: "center",
    display: "flex",
    renderCell: (params: GridRenderCellParams) => {
      const role = params.row.role as keyof UserRoleColors;
      return <Chip size="small" label={role} color={userRolesColors[role]} />;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    display: "flex",
    renderCell: (params: GridRenderCellParams) => {
      const isAdmin = params.row.role === "admin";
      return (
        <div className="flex gap-2 items-center">
          <TooltipArrow title="View" placement="bottom">
            <IconButton
              sx={{ p: 0.5, backgroundColor: "transparent!important" }}
            >
              <Link href={`users/${params.row.id}`} className="flex">
                <i className="bi bi-eye text-xs"></i>
              </Link>
            </IconButton>
          </TooltipArrow>

          <TooltipArrow title="Quick Edit" placement="bottom">
            <IconButton
              sx={{ p: 0.5, backgroundColor: "transparent!important" }}
              onClick={() => onEditUser(params.row)}
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
                onClick={() => onDeleteUser(params.row)}
              >
                <i className="bi bi-trash3 text-xs"></i>
              </IconButton>
            )}
          </TooltipArrow>
        </div>
      );
    },
  },
];
