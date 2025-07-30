"use client";

import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";
import { ToolbarSelectedIds } from "@/constants/table/toolbar/toolbar-selected-ids.const";
import TableToolbar from "../../shared/table/TableToolbar";
import DeleteUserBtn from "./DeleteUserBtn";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import QuickEditUserDialog from "./QuickEditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

export default function UsersTable() {
  const { data, loading, error } = useQuery<{ users: GetUserData[] }>(
    GET_USERS_QUERY
  );

  const [editUser, setEditUser] = useState<GetUserData | undefined>(undefined);
  const [deleteUser, setDeleteUser] = useState<GetUserData | undefined>(
    undefined
  );
  const [selectedIds, setSelectedIds] = useState<ToolbarSelectedIds>({
    type: "include",
    ids: new Set<string | number>(),
  });

  const users: GetUserData[] = data?.users || [];
  const selectedUsers: GetUserData[] = users.filter((user) =>
    selectedIds.ids.has(user.id as number)
  );

  const isRowSelectable = useCallback(
    (params: GridRowParams) => !(params.row.role === ("admin" as UserRole)),
    []
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
    if (selectedUsers.length > 0) {
      return <DeleteUserBtn users={selectedUsers} />;
    }
    return null;
  }, [selectedUsers]);

  const handleEditUser = useCallback((userData: GetUserData) => {
    setEditUser(userData);
  }, []);

  const handleDeleteUser = useCallback((userData: GetUserData) => {
    setDeleteUser(userData);
  }, []);

  const tableColumns = usersTableColumns({
    onEditUser: handleEditUser,
    onDeleteUser: handleDeleteUser,
  });

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  return (
    <>
      {editUser && (
        <QuickEditUserDialog
          data={editUser}
          open={editUser !== undefined}
          onClose={() => setEditUser(undefined)}
        />
      )}

      {deleteUser && (
        <DeleteUserDialog
          data={deleteUser}
          open={deleteUser !== undefined}
          onClose={() => setDeleteUser(undefined)}
        />
      )}

      <div className="flex w-full">
        <DataGrid
          rows={users}
          columns={tableColumns}
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
          isRowSelectable={isRowSelectable}
          onRowSelectionModelChange={handleSelectionChange}
          showToolbar
          checkboxSelection
          slots={{
            toolbar: () => (
              <TableToolbar toolbarContent={handleToolbarContent()} />
            ),
          }}
        />
      </div>
    </>
  );
}
