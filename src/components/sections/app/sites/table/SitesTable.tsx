"use client";

import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useCallback, useState, memo } from "react";
import { ToolbarSelectedIds } from "@/constants/table/toolbar/toolbar-selected-ids.const";
import TableToolbar from "@/components/sections/admin/shared/table/TableToolbar";
import DeleteSiteBtn from "./DeleteSiteBtn";

type SitesTableProps = {
  sites: GetSiteData[];
  tableCols: GridColDef[];
  isAdmin: boolean;
  loading?: boolean;
};

const selectedIdsInit: ToolbarSelectedIds = {
  type: "include",
  ids: new Set<string | number>(),
};

function SitesTable({
  sites,
  tableCols,
  isAdmin,
  loading = true,
}: SitesTableProps) {
  const [selectedIds, setSelectedIds] =
    useState<ToolbarSelectedIds>(selectedIdsInit);

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
    if (!isAdmin) return null;
    if (selectedIds.ids.size > 0) {
      return <DeleteSiteBtn sites={selectedIds.ids} />;
    }
    return null;
  }, [isAdmin, selectedIds]);

  return (
    <div className="flex w-full">
      <DataGrid
        rows={sites}
        loading={loading}
        columns={tableCols}
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnMenu
        pagination
        showToolbar
        checkboxSelection={isAdmin}
        onRowSelectionModelChange={handleSelectionChange}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          toolbar: () => (
            <TableToolbar toolbarContent={handleToolbarContent()} />
          ),
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </div>
  );
}

export default memo(SitesTable);
