import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/users/UserNameCell";
import { Chip, Column } from "@/components/ui";
import { UserRoleColors } from "@/types/users/user-role-colors.interface";
import { userRolesColors } from "@/constants/users/defaults/user-roles-colors";

export const usersTableColumns = (): Column[] => [
  {
    field: "id",
    headerName: "ID",
    minWidth: 80,
    renderCell: ({ value }) => {
      return <span className="text-xs">{value}</span>;
    },
  },
  {
    field: "username",
    headerName: "Account",
    flex: 1,
    minWidth: 200,
    renderCell: ({ row }) => (
      <UsersNameCell
        href={`users/${row.id}`}
        image={row.clerkImg}
        username={row.username}
        firstname={row.firstName}
        lastname={row.lastName}
      />
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 200,
    renderCell: ({ value }) => {
      return <span className="text-sm">{value}</span>;
    },
  },
  {
    field: "plan",
    headerName: "Plan",
    flex: 1,
    minWidth: 180,
    valueGetter: (row) => row.currentPlan?.plan || "Lite",
    renderCell: ({ row }) => {
      const currentPlan = row.currentPlan;
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
    minWidth: 100,
    valueGetter: (row) => row.sitesCount,
    renderCell: ({ row }) => {
      const sitesCount = row.sitesCount;
      const role = row.role as keyof UserRoleColors;
      return (
        <Chip size="small" label={sitesCount.toString()} color={userRolesColors[role]} />
      );
    },
  },
  {
    field: "state",
    headerName: "State",
    minWidth: 150,
    renderCell: () => {
      return <span className="text-xs">Active / Logged Out</span>;
    },
  },
  {
    field: "createdAt",
    headerName: "Member Since",
    minWidth: 150,
    renderCell: ({ value }) => {
      const createdAt = getFormattedDate(value);
      return <span className="text-xs">{createdAt}</span>;
    },
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 100,
    renderCell: ({ row }) => {
      const role = row.role as keyof UserRoleColors;
      return <Chip size="small" label={role} color={userRolesColors[role]} />;
    },
  },
];
