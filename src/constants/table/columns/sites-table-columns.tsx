"use client";
import Link from "next/link";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import UsersNameCell from "@/components/sections/admin/shared/table/UserNameCell";
import { maskApiKey } from "@/lib/utils/maskApiKey";
import { Chip, IconButton } from "@mui/material";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GetSiteData } from "@/types/sites/get-site-data.d";

interface SitesTableColumnsProps {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
  onNewApiKey: (siteData: Partial<GetSiteData>) => void;
}

export const sitesTableColumns = ({
  onEditSite,
  onDeleteSite,
  onNewApiKey,
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
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${params.row.domain}`}
        >
          {params.row.siteName}
        </Link>
      );
    },
  },
  {
    field: "user",
    headerName: "Owner",
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
          noImage
        />
      );
    },
  },
  {
    field: "apiKey",
    headerName: "Api Key",
    display: "flex",
    flex: 4,
    renderCell: (params: GridRenderCellParams) => {
      const maskedKey = maskApiKey(params.row.apiKey, 0);
      return (
        <div className="flex w-full items-center gap-3">
          <span className="text-xs">{maskedKey}</span>
          <TooltipArrow title="Refresh API Key" placement="bottom">
            <IconButton
              sx={{ p: 0.5, backgroundColor: "transparent!important" }}
              onClick={() =>
                onNewApiKey({
                  id: params.row.id,
                  domain: params.row.domain,
                })
              }
            >
              <i className="bi bi-arrow-clockwise text-base"></i>
            </IconButton>
          </TooltipArrow>
        </div>
      );
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
      return <Chip size="small" label="Disconnected" color="error" />;
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
