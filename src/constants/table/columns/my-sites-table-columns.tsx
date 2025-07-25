import { GridColDef } from "@mui/x-data-grid";
import { sitesTableColumns } from "./sites-table-columns";

export const mySitesTableColumns: GridColDef[] = sitesTableColumns.filter(
  (col) => col.field !== "user"
);
