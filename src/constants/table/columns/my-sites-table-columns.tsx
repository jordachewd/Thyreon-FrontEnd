import { GridColDef } from "@mui/x-data-grid";
import { sitesTableColumns } from "./sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";

export const mySitesTableColumns = (
  onEditSite: (siteData: GetSiteData) => void
): GridColDef[] =>
  sitesTableColumns(onEditSite).filter((col) => col.field !== "user");
