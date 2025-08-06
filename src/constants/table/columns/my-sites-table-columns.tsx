import { GridColDef } from "@mui/x-data-grid";
import { sitesTableColumns } from "./sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";

interface MySitesTableColumnsProps {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
}

export const mySitesTableColumns = (
  props: MySitesTableColumnsProps
): GridColDef[] =>
  sitesTableColumns({ ...props, routePrefix: "mysites" }).filter(
    (col) => col.field !== "user"
  );
