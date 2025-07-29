"use client";

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/UserNameCell";
import { Chip } from "@mui/material";

export const transactionsTableColumns: GridColDef[] = [
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
    field: "user",
    headerName: "Account",
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      const user = params.row.user;
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
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return <span className="capitalize">{params.row.plan}</span>;
    },
  },

  {
    field: "amount",
    headerName: "Amount(€)",
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return <span>€{params.row.amount}</span>;
    },
  },

  {
    field: "billing",
    headerName: "Paying",
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return <span className="capitalize">{params.row.billing}</span>;
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      const createdAt = getFormattedDate(params.row.createdAt);
      return <span className="text-xs">{createdAt}</span>;
    },
  },
  {
    field: "expiresAt",
    headerName: "Expires",
    display: "flex",
    flex: 1.5,
    renderCell: (params: GridRenderCellParams) => {
      const expiresAt = getFormattedDate(params.row.expiresAt);
      return <span className="text-xs">{expiresAt}</span>;
    },
  },

  {
    field: "status",
    headerName: "Status",
    align: "center",
    headerAlign: "center",
    display: "flex",
    renderCell: () => {
      return <Chip size="small" label="Paid" color="success" />;
    },
  },
];
