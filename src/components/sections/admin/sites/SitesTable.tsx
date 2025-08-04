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
import Typography from "@mui/material/Typography";

interface SitesTableProps {
  sites: GetSiteData[];
  error: ApolloError | undefined;
  tableCols: GridColDef[];
  loading: boolean;
}

export default function SitesTable({
  sites,
  error,
  tableCols,
  loading,
}: SitesTableProps) {
  const [selectedIds, setSelectedIds] = useState<ToolbarSelectedIds>({
    type: "include",
    ids: new Set<string | number>(),
  });

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
    if (selectedIds.ids.size > 0) {
      return <DeleteSiteBtn sites={selectedIds.ids} />;
    }
    return null;
  }, [selectedIds]);

  if (loading) return <LoadingBubbles />;

  if (error) {
    return (
      <ErrorCard
        title="Error!"
        error={error?.message || "An error occurred."}
      />
    );
  }

  if (sites.length === 0)
    return (
      <Typography variant="body2" color="textSecondary">
        No registered sites yet.
      </Typography>
    );

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
