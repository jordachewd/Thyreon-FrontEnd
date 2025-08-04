"use client";

import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { UserRole } from "@/types/users/user-role.d";
import { ToolbarSelectedIds } from "@/constants/table/toolbar/toolbar-selected-ids.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useCallback, useState } from "react";
import DeleteUserBtn from "./DeleteUserBtn";
import TableToolbar from "../../shared/table/TableToolbar";

interface AllUsersTableProps {
  data: GetUserData[];
  columns: GridColDef[];
  loading: boolean;
}

export default function AllUsersTable({
  data,
  columns,
  loading,
}: AllUsersTableProps) {
  const [selectedIds, setSelectedIds] = useState<ToolbarSelectedIds>({
    type: "include",
    ids: new Set<string | number>(),
  });

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
        columns={columns}
        loading={loading}
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
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
      />
    </div>
  );
}
