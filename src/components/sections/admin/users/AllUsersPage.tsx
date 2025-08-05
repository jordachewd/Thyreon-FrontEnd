"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import QuickEditUserDialog from "./dialogs/QuickEditUserDialog";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import AllUsersTable from "./table/AllUsersTable";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { usersTableColumns } from "@/constants/table/columns/users-table-columns";
import { GetUserData } from "@/types/users/get-user-data.d";
import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";
import { useNewUserSocket } from "@/lib/hooks/sockets/useNewUserSocket";
import { useUpdatedUserSocket } from "@/lib/hooks/sockets/useUpdatedUserSocket";
import { useDeletedUserSocket } from "@/lib/hooks/sockets/useDeletedUserSocket";
import { useUsersPageStore } from "@/lib/stores/users/useUsersPageStore";

export default function AllUsersPage() {
  const { data, loading, error, refetch } = useQuery<{
    users: GetUserData[];
  }>(GET_USERS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const users: GetUserData[] = data?.users || [];
  const { update, remove, setUpdate, setRemove } = useUsersPageStore();

  const handleUpdate = useCallback((userData: GetUserData) => {
    setUpdate(userData);
  }, []);

  const handleRemove = useCallback((userData: GetUserData) => {
    setRemove(userData);
  }, []);

  const tableColumns = usersTableColumns({
    onEditUser: handleUpdate,
    onDeleteUser: handleRemove,
  });

  useNewUserSocket(() => {
    refetch();
  });

  useUpdatedUserSocket(() => {
    refetch();
  });

  useDeletedUserSocket(() => {
    refetch();
  });

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  return (
    <>
      {update && (
        <QuickEditUserDialog
          data={update}
          open={update !== undefined}
          onClose={() => setUpdate(undefined)}
        />
      )}

      {remove && (
        <DeleteUserDialog
          data={remove}
          open={remove !== undefined}
          onClose={() => setRemove(undefined)}
        />
      )}

      <AllUsersTable data={users} columns={tableColumns} />
    </>
  );
}
