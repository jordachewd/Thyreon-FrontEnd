"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { useUsersPageStore } from "@/lib/stores/users/useUsersPageStore";
import { useCallback, useMemo } from "react";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import QuickEditUserDialog from "./dialogs/QuickEditUserDialog";
import AllUsersTable from "./table/AllUsersTable";
import { GetUserData } from "@/types/users/get-user-data.d";

type UsersPageProps = {
  users: GetUserData[];
};

export default function UsersPage({ users }: UsersPageProps) {
  const { update, remove, setUpdate, setRemove } = useUsersPageStore();

  const handleUpdate = useCallback(setUpdate, []);
  const handleRemove = useCallback(setRemove, []);

  const tableColumns = useMemo(() => {
    return usersTableColumns({
      onEditUser: handleUpdate,
      onDeleteUser: handleRemove,
    });
  }, [handleUpdate, handleRemove]);

  if (!users || users.length === 0)
    return <ErrorCard error="No users found." />;

  return (
    <>
      <QuickEditUserDialog
        data={update}
        open={!!update}
        onClose={() => setUpdate(undefined)}
      />

      <DeleteUserDialog
        data={remove}
        open={!!remove}
        onClose={() => setRemove(undefined)}
      />

      <AllUsersTable data={users} columns={tableColumns} />
    </>
  );
}
