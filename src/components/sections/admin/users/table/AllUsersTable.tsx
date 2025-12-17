"use client";

import { ToolbarSelectedIds } from "@/constants/table/toolbar/toolbar-selected-ids.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import {
  GridRowParams,
  GridRowSelectionModel,
  DataGrid,
} from "@mui/x-data-grid";
import { useState, useCallback, memo } from "react";
import TableToolbar from "../../shared/table/TableToolbar";
import DeleteUserBtn from "./DeleteUserBtn";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";

type UsersTable = {
  data: GetUserData[];
};

const selectedIdsInit: ToolbarSelectedIds = {
  type: "include",
  ids: new Set<string | number>(),
};

function AllUsersTable({ data }: UsersTable) {
  const columns = usersTableColumns();

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
    const selectionArray = Array.isArray(newSelection)
      ? newSelection
      : Object.values(newSelection);

    setSelectedIds({
      type: "include",
      ids: new Set(selectionArray),
    });
  }, []);

  const ToolbarComponent = useCallback(() => {
    const clerkIds: string[] = selectedUsers.map((user) => user.clerkId);
    const toolbarContent =
      selectedUsers.length > 0 ? <DeleteUserBtn users={clerkIds} /> : null;

    return <TableToolbar toolbarContent={toolbarContent} />;
  }, [selectedUsers]);

  return (
    <div className="flex w-full">
      <DataGrid
        rows={data}
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
          toolbar: ToolbarComponent,
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

export default memo(AllUsersTable);
