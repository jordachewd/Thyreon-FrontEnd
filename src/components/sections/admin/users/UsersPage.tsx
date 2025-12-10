"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { useDeletedUserSocket } from "@/lib/hooks/sockets/useDeletedUserSocket";
import { useNewUserSocket } from "@/lib/hooks/sockets/useNewUserSocket";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import useUsersTable from "@/lib/hooks/users/table/useUsersTable";
import { useUsersPageStore } from "@/lib/stores/users/useUsersPageStore";
import { useCallback, useMemo } from "react";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import QuickEditUserDialog from "./dialogs/QuickEditUserDialog";
import AllUsersTable from "./table/AllUsersTable";

export default function UsersPage() {
  const { loading, error, refetch, users } = useUsersTable();
  const { update, remove, setUpdate, setRemove } = useUsersPageStore();
  

  const handleUpdate = useCallback(setUpdate, []);
  const handleRemove = useCallback(setRemove, []);
  const handleRefetch = useCallback(() => refetch(), [refetch]);

  useNewUserSocket(handleRefetch);
  useUpdatedUserSocket(handleRefetch);
  useDeletedUserSocket(handleRefetch);

  const tableColumns = useMemo(() => {
    return usersTableColumns({
      onEditUser: handleUpdate,
      onDeleteUser: handleRemove,
    });
  }, [handleUpdate, handleRemove]);

  if (error) return <ErrorCard error={error.message} />;

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

      <AllUsersTable data={users} columns={tableColumns} loading={loading} />
    </>
  );
}
