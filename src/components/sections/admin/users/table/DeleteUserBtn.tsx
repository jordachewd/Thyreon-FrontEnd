"use client";

import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useAdminContext } from "@/context/admin/AdminContext";
import { DELETE_USERS } from "@/constants/graphql/users/delete-users.const";
import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";
import ErrorCard from "@/components/shared/ErrorCard";

interface DeleteUserButtonProps {
  users: GetUserData[] | undefined;
  disabled?: boolean;
  onSuccess?: () => void;
}

export default function DeleteUserBtn({
  users,
  disabled = false,
  onSuccess,
}: DeleteUserButtonProps) {
  const [deleteUsers, { loading, error }] = useMutation(DELETE_USERS, {
    refetchQueries: [GET_USERS_QUERY, "GetAllUsers"],
    awaitRefetchQueries: true,
  });
  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const isOneUser = users?.length === 1;
  const userOrUsers = isOneUser ? "User" : "Users";

  const handleDelete = async () => {
    const confirmMsg = isOneUser
      ? `Are you sure you want to delete user '${users[0].username}'?`
      : `Are you sure you want to delete ${users?.length} users?`;
    if (!confirm(confirmMsg + `\nThis action cannot be undone.`)) return;

    const clerkIds = users?.map((user) => user.clerkId);

    try {
      await deleteUsers({
        variables: { clerkIds: clerkIds },
        onCompleted: (data) => {
          const response = data?.deleteUsers;
          updateAlert({
            text: response.message,
            severity: response.status,
          });

          if (onSuccess) onSuccess();
        },
      });
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while deleting users.";
      const errorMessage = (error as Error).message || defaultMsg;
      console.log(errorMessage);
    }
  };

  return (
    <>
      {error ? (
        <ErrorCard mini error={error.message} />
      ) : (
        <Button
          size="small"
          color="error"
          variant="outlined"
          disabled={disabled || loading}
          onClick={handleDelete}
          sx={{
            fontSize: "0.675rem",
            color: "error.main",
            borderColor: "error.main",
            backgroundColor: "transparent",
          }}
        >
          {loading ? "Deleting ..." : `Delete ${userOrUsers}`}
        </Button>
      )}
    </>
  );
}
