"use client";

import { Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { UserRoleColors } from "@/types/users/user-role-colors.interface";
import { userRolesColors } from "@/constants/users/defaults/user-roles-colors";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/users/table/UsersNameCell";
import UsersActionsCell from "@/components/sections/admin/users/table/UsersActionsCell";
import UsersImageCell from "@/components/sections/admin/users/table/UsersImageCell";

export const usersTableColumns: GridColDef[] = [
  {
    align: "center",
    field: "clerkImg",
    display: "flex",
    headerName: "",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    flex: 0.5,
    renderCell: (params: GridRenderCellParams) => (
      <UsersImageCell
        src={params.row.clerkImg}
        alt={params.row.username}
        href={`users/${params.row.id}`}
      />
    ),
  },
  {
    field: "username",
    headerName: "User",
    flex: 2,
    display: "flex",

    renderCell: (params: GridRenderCellParams) => (
      <UsersNameCell
        href={`users/${params.row.id}`}
        username={params.row.username}
        firstname={params.row.firstName}
        lastname={params.row.lastName}
      />
    ),
  },
  {
    field: "plan",
    headerName: "Current Plan",
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
          <span className="textxxs text-slate-400">{planUntil}</span>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    display: "flex",
    renderCell: (params: GridRenderCellParams) => {
      return <span className="text-sm">{params.row.email}</span>;
    },
  },

  {
    field: "createdAt",
    headerName: "Registered",
    flex: 2,
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
    renderCell: (params: GridRenderCellParams) => (
      <UsersActionsCell href={`users/${params.row.id}`} />
    ),
  },
];
