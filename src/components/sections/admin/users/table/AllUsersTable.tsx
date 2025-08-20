"use client";

import { ToolbarSelectedIds } from "@/constants/table/toolbar/toolbar-selected-ids.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import {
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
  DataGrid,
} from "@mui/x-data-grid";
import { useState, useCallback } from "react";
import TableToolbar from "../../shared/table/TableToolbar";
import DeleteUserBtn from "./DeleteUserBtn";

interface AllUsersTableProps {
  data: GetUserData[];
  columns: GridColDef[];
  loading?: boolean;
}

const selectedIdsInit: ToolbarSelectedIds = {
  type: "include",
  ids: new Set<string | number>(),
};

export default function AllUsersTable({
  data,
  columns,
  loading = true,
}: AllUsersTableProps) {
  const [selectedIds, setSelectedIds] =
    useState<ToolbarSelectedIds>(selectedIdsInit);

  const selectedUsers: GetUserData[] = data.filter((user) =>
    selectedIds.ids.has(user.id as number)
  );

  const isRowSelectable = useCallback(
    (params: GridRowParams) => !(params.row.role === ("admin" as UserRole)),
    []
  );

  const handleSelection = useCallback((newSelection: GridRowSelectionModel) => {
    setSelectedIds({
      type: newSelection.type,
      ids: new Set(newSelection.ids),
    });
  }, []);

  const handleToolbar = useCallback(() => {
    if (selectedUsers.length > 0) {
      const clerkIds: string[] = selectedUsers.map((user) => user.clerkId);
      return <DeleteUserBtn users={clerkIds} />;
    }
    return null;
  }, [selectedUsers]);

  return (
    <div className="flex w-full">
      <DataGrid
        rows={data}
        loading={loading}
        columns={columns}
        pagination
        showToolbar
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnMenu
        checkboxSelection
        isRowSelectable={isRowSelectable}
        onRowSelectionModelChange={handleSelection}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          toolbar: () => <TableToolbar toolbarContent={handleToolbar()} />,
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
