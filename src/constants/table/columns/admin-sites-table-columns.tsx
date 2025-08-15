"use client";

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/users/UserNameCell";
import SiteNameCell from "@/components/sections/admin/shared/table/sites/SiteNameCell";
import SiteActionCell from "@/components/sections/admin/shared/table/sites/SiteActionCell";

interface AdminSitesTableColumnsProps {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
  routePrefix?: "admin/sites" | "sites";
}

export const adminSitesTableColumns = ({
  onEditSite,
  onDeleteSite,
  routePrefix = "admin/sites",
}: AdminSitesTableColumnsProps): GridColDef[] => [
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
    field: "siteName",
    headerName: "Site Name",
    display: "flex",
    flex: 1.5,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <SiteNameCell
          href={`/${routePrefix}/${params.row.id}`}
          name={params.row.siteName}
          domain={params.row.domain}
        />
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    display: "flex",
    flex: 3,
    renderCell: (params: GridRenderCellParams) => {
      const status = params.row.status;
      const statusColor = status === "active" ? "success" : "error";
      const chipColor = status === "revoked" ? "primary" : statusColor;
      return <Chip size="small" label={status} color={chipColor} />;
    },
  },
  {
    field: "createdAt",
    headerName: "Registered",
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
    field: "user",
    headerName: "Owner",
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
          noImage
        />
      );
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
      <SiteActionCell
        params={params}
        onEdit={onEditSite}
        onRemove={onDeleteSite}
      />
    ),
  },
];
