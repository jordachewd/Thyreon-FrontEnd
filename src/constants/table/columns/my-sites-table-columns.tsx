import { GridColDef } from "@mui/x-data-grid";
import { sitesTableColumns } from "./sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";

interface MySitesTableColumnsProps {
  onEditSite: (siteData: GetSiteData) => void;
  onDeleteSite: (siteData: GetSiteData) => void;
  onNewApiKey: (siteId: number) => void;
}

export const mySitesTableColumns = (
  props: MySitesTableColumnsProps
): GridColDef[] =>
  sitesTableColumns(props).filter((col) => col.field !== "user");
