import { Column } from "@/components/ui";
import { adminSitesTableColumns } from "./admin-sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";

type UserSitesTableColumnsProps = {
  onEditSite: (siteData: Partial<GetSiteData>) => void;
  onDeleteSite: (siteData: Partial<GetSiteData>) => void;
};

export const userSitesTableColumns = (
  props: UserSitesTableColumnsProps
): Column[] =>
  adminSitesTableColumns({ ...props }).filter(
    (col) => col.field !== "user"
  );
