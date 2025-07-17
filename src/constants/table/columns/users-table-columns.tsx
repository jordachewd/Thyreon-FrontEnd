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
    renderCell: (params: GridRenderCellParams) => (
      <UsersImageCell
        src={params.row.clerkImg}
        alt={params.row.username}
        href={`users/${params.row.username.toLowerCase()}`}
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
    field: "email",
    headerName: "Email",
    flex: 6,
    display: "flex",
  },
  {
    field: "createdAt",
    headerName: "Member since",
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
      <UsersActionsCell href={`users/${params.row.username.toLowerCase()}`} />
    ),
  },
];
