"use client";

import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useAdminContext } from "@/context/admin/AdminContext";
import { DELETE_USERS } from "@/constants/graphql/users/delete-users.const";
import ErrorCard from "@/components/shared/ErrorCard";

interface DeleteUserButtonProps {
  users: string[] | undefined;
  disabled?: boolean;
  onSuccess?: () => void;
}

export default function DeleteUserBtn({
  users,
  disabled = false,
  onSuccess,
}: DeleteUserButtonProps) {
  const { updateAlert } = useAdminContext().alertCtx;

  const isOne = users?.length === 1;
  const oneOrMany = isOne ? "user" : "users";

  const [deleteUsers, { loading, error, reset }] = useMutation(DELETE_USERS, {
    onCompleted: (data) => {
      const response = data?.deleteUsers;
      updateAlert({
        text: response.message,
        severity: response.status,
      });

      if (onSuccess) onSuccess();
    },
  });

  const handleDelete = async () => {
    const introMsg = "Are you sure you want to delete";
    const endMsg = "\nThis action cannot be undone.";
    const confirmMsg = `${introMsg} ${users?.length} ${oneOrMany}?`;

    if (!confirm(confirmMsg + endMsg)) return;

    await deleteUsers({
      variables: { clerkIds: users },
    });
  };
  return (
    <>
      {error ? (
        <ErrorCard mini error={error.message} onCloseMini={reset} />
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
          {loading ? "Deleting ..." : `Delete ${users?.length} ${oneOrMany}`}
        </Button>
      )}
    </>
  );
}
