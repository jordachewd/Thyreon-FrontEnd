"use client";

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/users/table/UsersNameCell";
import { Chip } from "@mui/material";
import Link from "next/link";

export const sitesTableColumns: GridColDef[] = [
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
    flex: 1.5,
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
    field: "siteName",
    headerName: "Site Name",
    display: "flex",
    flex: 1.5,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link target="_blank" href={params.row.domain}>
          {params.row.siteName}
        </Link>
      );
    },
  },

  {
    field: "apiKey",
    headerName: "Api Key",
    display: "flex",
    flex: 4,
    renderCell: (params: GridRenderCellParams) => {
      return <span>{params.row.apiKey}</span>;
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
    field: "lastSeen",
    headerName: "Last Seen",
    display: "flex",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      const lastSeen = getFormattedDate(params.row.lastSeen);
      return <span className="text-xs">{lastSeen}</span>;
    },
  },

  {
    field: "status",
    headerName: "Status",
    align: "center",
    headerAlign: "center",
    display: "flex",
    flex: 1,
    renderCell: () => {
      return <Chip size="small" label="Not Connected" color="error" />;
    },
  },
];
