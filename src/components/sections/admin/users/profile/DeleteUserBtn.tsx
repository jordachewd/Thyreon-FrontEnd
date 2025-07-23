"use client";

import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GetUserData } from "@/types/users/get-user-data.d";
import { DELETE_USERS } from "@/constants/graphql/users/delete-users.const";
import { useAdminContext } from "@/context/admin/AdminContext";
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
  const [deleteUsers, { loading, error }] = useMutation(DELETE_USERS);
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

    console.log("Deleting users:", users);
    console.log("Deleting users with clerkIds:", clerkIds);

    try {
      await deleteUsers({
        variables: { clerkIds: clerkIds },
        refetchQueries: ["GetAllUsers"],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
          const response = data?.deleteUsers;

          updateAlert({
            text: response.message || "User deleted successfully.",
            severity: response.status || "success",
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
          {loading ? "Deleting..." : `Delete ${userOrUsers}`}
        </Button>
      )}
    </>
  );
}
