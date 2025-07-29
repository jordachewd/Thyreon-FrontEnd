"use client";

import { Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { UserRoleColors } from "@/types/users/user-role-colors.interface";
import { userRolesColors } from "@/constants/users/defaults/user-roles-colors";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/UserNameCell";
import UsersActions from "@/components/sections/admin/users/table/UsersActions";

export const usersTableColumns: GridColDef[] = [
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
          <span className="text-xs text-slate-400">{planUntil}</span>
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
    renderCell: (params: GridRenderCellParams) => (
      <UsersActions href={`users/${params.row.id}`} />
    ),
  },
];
