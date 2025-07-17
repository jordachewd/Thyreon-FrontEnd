"use client";
import css from "./UsersTable.module.css";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { usersTableColumns as columns } from "@/constants/table/columns/users-table-columns";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { GridRowParams } from "@mui/x-data-grid";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import UsersTableToolbar from "./UsersTableToolbar";
import dynamic from "next/dynamic";
import ErrorCard from "@/components/shared/ErrorCard";

const DynamicDataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  {
    ssr: false, // This ensures it's only rendered on the client
    loading: () => <LoadingBubbles />,
  }
);

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      email
      username
      firstName
      lastName
      role
      clerkImg
      createdAt
    }
  }
`;

interface SelectedIdsProps {
  type: "include" | "exclude";
  ids: Set<string | number>;
}

export default function UsersTable() {
  const { data, loading, error } = useQuery<{ users: GetUserData[] }>(
    GET_ALL_USERS_QUERY
  );

  const [selectedIds, setSelectedIds] = useState<SelectedIdsProps>({
    type: "include",
    ids: new Set<string | number>(),
  });

  if (error) return <ErrorCard title="Error!" error={error.message} />;

  const users: GetUserData[] = data?.users || [];

  const selectedUsers: GetUserData[] = users.filter((user) =>
    selectedIds.ids.has(user.id as number)
  );

  return (
    <div className={css.wrapper}>
      <DynamicDataGrid
        loading={loading}
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        isRowSelectable={(params: GridRowParams) =>
          !(params.row.role === ("admin" as UserRole))
        }
        disableColumnResize
        disableColumnSelector
        disableColumnMenu
        onRowSelectionModelChange={(newSelection) => {
          if (
            newSelection &&
            typeof newSelection === "object" &&
            "ids" in newSelection
          ) {
            setSelectedIds({
              type: newSelection.type,
              ids: new Set(newSelection.ids),
            });
          }
        }}
        slots={{
          toolbar: () => <UsersTableToolbar selectedRows={selectedUsers} />,
        }}
        showToolbar
      />
    </div>
  );
}
