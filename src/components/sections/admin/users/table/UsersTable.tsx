"use client";
import css from "./UsersTable.module.css";
import { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { usersTableColumns as columns } from "@/constants/table/columns/users-table-columns";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import {
  DataGrid,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";
import UsersTableToolbar from "./UsersTableToolbar";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

interface SelectedIdsProps {
  type: "include" | "exclude";
  ids: Set<string | number>;
}

export default function UsersTable() {
  const { data, loading, error } = useQuery<{ users: GetUserData[] }>(
    GET_USERS_QUERY
  );

  const [selectedIds, setSelectedIds] = useState<SelectedIdsProps>({
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

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  return (
    <div className={css.wrapper}>
      <DataGrid
        rows={users}
        columns={columns}
        checkboxSelection
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
        slots={{
          toolbar: () => <UsersTableToolbar selectedRows={selectedUsers} />,
        }}
      />
    </div>
  );
}
