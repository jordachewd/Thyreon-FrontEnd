"use client";
import css from "./UsersTable.module.css";
import dynamic from "next/dynamic";
const DynamicDataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  {
    ssr: false, // This ensures it's only rendered on the client
    loading: () => <LoadingBubbles />,
  }
);
import { useState } from "react";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { GridRowParams } from "@mui/x-data-grid";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import UsersTableToolbar from "./UsersTableToolbar";

interface UsersProps {
  users: GetUserData[];
}

interface SelectedIdsProps {
  type: "include" | "exclude";
  ids: Set<string | number>;
}

export default function UsersTable({ users }: UsersProps) {
  const [selectedIds, setSelectedIds] = useState<SelectedIdsProps>({
    type: "include",
    ids: new Set<string | number>(),
  });

  const selectedUsers: GetUserData[] = users.filter((user) =>
    selectedIds.ids.has(user.id as number)
  );

  return (
    <div className={css.wrapper}>
      <DynamicDataGrid
        rows={users}
        columns={usersTableColumns}
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
            console.log("New selection:", newSelection);
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
