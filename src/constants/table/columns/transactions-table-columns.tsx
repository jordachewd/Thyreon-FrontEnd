import { Column } from "@/components/ui";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/users/UserNameCell";
import { Chip } from "@/components/ui";

export const transactionsTableColumns: Column[] = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 80,
    renderCell: ({ value }) => {
      return <span className="text-xs">{value}</span>;
    },
  },
  {
    field: "user",
    headerName: "Account",
    flex: 1,
    minWidth: 200,
    renderCell: ({ row }) => {
      const user = row.user;
      return (
        <UsersNameCell
          href={`users/${user.id}`}
          image={user.clerkImg}
          username={user.username}
          firstname={user.firstName}
          lastname={user.lastName}
        />
      );
    },
  },
  {
    field: "plan",
    headerName: "Plan",
    minWidth: 120,
    renderCell: ({ value }) => {
      return <span className="capitalize">{value}</span>;
    },
  },
  {
    field: "amount",
    headerName: "Amount(€)",
    minWidth: 120,
    renderCell: ({ value }) => {
      return <span>€{value}</span>;
    },
  },
  {
    field: "billing",
    headerName: "Paying",
    minWidth: 120,
    renderCell: ({ value }) => {
      return <span className="capitalize">{value}</span>;
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    minWidth: 150,
    renderCell: ({ value }) => {
      const createdAt = getFormattedDate(value);
      return <span className="text-xs">{createdAt}</span>;
    },
  },
  {
    field: "expiresAt",
    headerName: "Expires",
    minWidth: 150,
    renderCell: ({ value }) => {
      const expiresAt = getFormattedDate(value);
      return <span className="text-xs">{expiresAt}</span>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    renderCell: () => {
      return <Chip size="small" label="Paid" color="success" />;
    },
  },
];
