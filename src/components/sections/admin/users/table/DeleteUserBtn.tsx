"use client";

import { memo, useState } from "react";
import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { Button } from "@/components/ui";
import { deleteUsers } from "@/app/actions/users";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOne = users?.length === 1;
  const oneOrMany = isOne ? "user" : "users";

  const handleDelete = async () => {
    const introMsg = "Are you sure you want to delete";
    const endMsg = "\nThis action cannot be undone.";
    const confirmMsg = `${introMsg} ${users?.length} ${oneOrMany}?`;

    if (!confirm(confirmMsg + endMsg)) return;

    setLoading(true);
    setError(null);

    try {
      const result = await deleteUsers(users || []);
      updateAlert({
        text: result.message,
        severity: result.status,
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete users");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {error ? (
        <ErrorCard mini error={error} onCloseMini={() => setError(null)} />
      ) : (
        <Button
          size="small"
          color="error"
          disabled={disabled || loading}
          onClick={handleDelete}
        >
          {loading ? "Deleting ..." : `Delete ${oneOrMany}`}
        </Button>
      )}
    </>
  );
}

export default memo(DeleteUserBtn);
