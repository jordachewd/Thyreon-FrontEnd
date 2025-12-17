"use client";

import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { useState, useCallback, memo } from "react";
import TableToolbar from "../../shared/table/TableToolbar";
import DeleteUserBtn from "./DeleteUserBtn";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { DataGrid } from "@/components/ui";

type UsersTable = {
  data: GetUserData[];
};

function AllUsersTable({ data }: UsersTable) {
  const columns = usersTableColumns();
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const selectedUsers: GetUserData[] = data.filter((user) =>
    selectedIds.includes(user.id as number)
  );

  const handleSelection = useCallback((newSelection: (string | number)[]) => {
    // Filter out admin users from selection
    const filteredSelection = newSelection.filter((id) => {
      const user = data.find((u) => u.id === id);
      return user && user.role !== ("admin" as UserRole);
    });
    setSelectedIds(filteredSelection);
  }, [data]);

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
        checkboxSelection
        onRowSelectionModelChange={handleSelection}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
        slots={{
          toolbar: ToolbarComponent,
        }}
      />
    </div>
  );
}

export default memo(AllUsersTable);
