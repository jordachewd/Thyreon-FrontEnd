import { GridColDef } from "@mui/x-data-grid";
import { adminSitesTableColumns } from "./admin-sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";

type UserSitesTableColumnsProps = {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
};

export const userSitesTableColumns = (
  props: UserSitesTableColumnsProps
): GridColDef[] =>
  adminSitesTableColumns({ ...props, routePrefix: "sites" }).filter(
    (col) => col.field !== "user"
  );
