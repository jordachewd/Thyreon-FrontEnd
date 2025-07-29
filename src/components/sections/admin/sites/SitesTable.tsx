"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { ApolloError } from "@apollo/client";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { ToolbarSelectedIds } from "@/constants/table/toolbar/toolbar-selected-ids.const";
import TableToolbar from "../shared/table/TableToolbar";
import DeleteSiteBtn from "./DeleteSiteBtn";

interface SitesTableProps {
  sites: GetSiteData[];
  loading: boolean;
  error: ApolloError | undefined;
  tableCols: GridColDef[];
}

export default function SitesTable({
  sites,
  loading,
  error,
  tableCols,
}: SitesTableProps) {
  const [selectedIds, setSelectedIds] = useState<ToolbarSelectedIds>({
    type: "include",
    ids: new Set<string | number>(),
  });

  const selectedSites: GetSiteData[] = sites.filter((site) =>
    selectedIds.ids.has(site.id as number)
  );

  const handleSelectionChange = useCallback(
    (newSelection: GridRowSelectionModel) => {
      setSelectedIds({
        type: newSelection.type,
        ids: new Set(newSelection.ids),
      });
    },
    []
  );

  const handleToolbarContent = useCallback(() => {
    if (selectedSites.length > 0) {
      return <DeleteSiteBtn sites={selectedSites} />;
    }
    return null;
  }, [selectedSites]);

  if (loading) return <LoadingBubbles />;
  if (error) {
    return (
      <ErrorCard
        title="Error!"
        error={error?.message || "An error occurred."}
      />
    );
  }

  return (
    <div className="flex w-full">
      <DataGrid
        rows={sites}
        columns={tableCols}
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnMenu
        pagination
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        showToolbar
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        slots={{
          toolbar: () => (
            <TableToolbar toolbarContent={handleToolbarContent()} />
          ),
        }}
      />
    </div>
  );
}
