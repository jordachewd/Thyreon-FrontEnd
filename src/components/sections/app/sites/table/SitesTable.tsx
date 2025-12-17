"use client";

import { DataGrid, Column } from "@/components/ui";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useCallback, useState, memo } from "react";
import TableToolbar from "@/components/sections/admin/shared/table/TableToolbar";
import DeleteSiteBtn from "./DeleteSiteBtn";

type SitesTableProps = {
  sites: GetSiteData[];
  tableCols: Column[];
  isAdmin: boolean;
  loading?: boolean;
};

function SitesTable({
  sites,
  tableCols,
  isAdmin,
  loading = false,
}: SitesTableProps) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const handleSelectionChange = useCallback((newSelection: (string | number)[]) => {
    setSelectedIds(newSelection);
  }, []);

  const handleToolbarContent = useCallback(() => {
    if (!isAdmin) return null;
    if (selectedIds.length > 0) {
      return <DeleteSiteBtn sites={new Set(selectedIds)} />;
    }
    return null;
  }, [isAdmin, selectedIds]);

  const ToolbarComponent = useCallback(
    () => <TableToolbar toolbarContent={handleToolbarContent()} />,
    [handleToolbarContent]
  );

  return (
    <div className="flex w-full">
      <DataGrid
        rows={sites}
        loading={loading}
        columns={tableCols}
        checkboxSelection={isAdmin}
        onRowSelectionModelChange={handleSelectionChange}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        slots={{
          toolbar: ToolbarComponent,
        }}
      />
    </div>
  );
}

export default memo(SitesTable);
