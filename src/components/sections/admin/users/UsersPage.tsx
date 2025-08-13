"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import QuickEditUserDialog from "./dialogs/QuickEditUserDialog";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import AllUsersTable from "./table/AllUsersTable";
import { useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";
import { useNewUserSocket } from "@/lib/hooks/sockets/useNewUserSocket";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import { useDeletedUserSocket } from "@/lib/hooks/sockets/useDeletedUserSocket";
import { useUsersPageStore } from "@/lib/stores/users/useUsersPageStore";

export default function UsersPage() {
  const { data, loading, error, refetch } = useQuery<{
    users: GetUserData[];
  }>(GET_USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const users = useMemo(() => data?.users ?? [], [data]);
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

  if (loading) return <LoadingBubbles />;
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

      <AllUsersTable data={users} columns={tableColumns} />
    </>
  );
}
