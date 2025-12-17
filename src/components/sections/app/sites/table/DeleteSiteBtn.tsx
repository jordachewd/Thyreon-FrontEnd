"use client";

import { memo, useState } from "react";
import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { Button } from "@/components/ui";

import { deleteSites } from "@/app/actions/sites";

interface DeleteSiteBtnProps {
  sites: Set<string | number> | undefined;
  disabled?: boolean;
  onSuccess?: () => void;
}

function DeleteSiteBtn({
  sites,
  disabled = false,
  onSuccess,
}: DeleteSiteBtnProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => setError(null);

  const oneOrMany = sites?.size === 1 ? "site" : "sites";

  const handleDelete = async () => {
    const introMsg = "Are you sure you want to delete";
    const endMsg = "\nThis action cannot be undone.";
    const confirmMsg = `${introMsg} ${sites?.size} ${oneOrMany}?`;

    if (!confirm(confirmMsg + endMsg)) return;

    const siteIds = sites ? Array.from(sites).map((site) => Number(site)) : [];

    setLoading(true);
    setError(null);

    try {
      const result = await deleteSites(siteIds);
      updateAlert({
        text: result.message,
        severity: result.status,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error ? (
        <ErrorCard mini error={error} onCloseMini={reset} />
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

export default memo(DeleteSiteBtn);
