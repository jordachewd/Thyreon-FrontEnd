"use client";

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip, IconButton } from "@mui/material";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/UserNameCell";
import SiteNameCell from "@/components/sections/admin/shared/table/SiteNameCell";

interface SitesTableColumnsProps {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
  routePrefix?: "allsites" | "mysites";
}

export const sitesTableColumns = ({
  onEditSite,
  onDeleteSite,
  routePrefix = "allsites",
}: SitesTableColumnsProps): GridColDef[] => [
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
    renderCell: () => {
      return <Chip size="small" label="Disconnected" color="error" />;
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
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div className="flex gap-2 items-center">
          <TooltipArrow title="Edit" placement="bottom">
            <IconButton
              sx={{ p: 0.5, backgroundColor: "transparent!important" }}
              onClick={() =>
                onEditSite({
                  id: params.row.id,
                  siteName: params.row.siteName,
                  domain: params.row.domain,
                })
              }
            >
              <i className="bi bi-pen text-xs"></i>
            </IconButton>
          </TooltipArrow>

          <TooltipArrow title="Delete" placement="bottom">
            <IconButton
              sx={{ p: 0.5, backgroundColor: "transparent!important" }}
              onClick={() =>
                onDeleteSite({
                  id: params.row.id,
                  domain: params.row.domain,
                })
              }
            >
              <i className="bi bi-trash3 text-xs"></i>
            </IconButton>
          </TooltipArrow>
        </div>
      );
    },
  },
];
