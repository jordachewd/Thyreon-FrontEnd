"use client";

import { memo } from "react";
import ErrorCard from "@/components/shared/ErrorCard";
import {
  DELETE_USERS,
  DeleteUsersMutationResponse,
} from "@/constants/graphql/users/delete-users.const";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useMutation } from "@apollo/client/react";
import Button from "@mui/material/Button";

interface DeleteUserButtonProps {
  users: string[] | undefined;
  disabled?: boolean;
  onSuccess?: () => void;
}

function DeleteUserBtn({
  users,
  disabled = false,
  onSuccess,
}: DeleteUserButtonProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const isOne = users?.length === 1;
  const oneOrMany = isOne ? "user" : "users";

  const [deleteUsers, { loading, error, reset }] = useMutation(DELETE_USERS, {
    onCompleted: (data) => {
      const { deleteUsers } = data as DeleteUsersMutationResponse;
      updateAlert({
        text: deleteUsers.message,
        severity: deleteUsers.status,
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
          {loading ? "Deleting ..." : `Delete ${oneOrMany}`}
        </Button>
      )}
    </>
  );
}

export default memo(DeleteUserBtn);
