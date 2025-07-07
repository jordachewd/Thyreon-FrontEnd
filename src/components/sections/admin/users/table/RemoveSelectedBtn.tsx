"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import { AlertParams } from "@/types/alert-message.interface";
import { BulkDeleteProps } from "@/types/bulk-delete.interface";
import AlertMessage from "@/components/layout/common/AlertMessage";
import bulkDelete from "@/lib/actions/delete-bulk.action";

interface RemoveSelectedBtnProps {
  data: BulkDeleteProps;
  btnLabel?: string;
  successFn?: () => void;
  confirmMsg?: string;
  disabled?: boolean;
}

export default function RemoveSelectedBtn({
  data,
  btnLabel = "Remove selected",
  disabled = false,
  confirmMsg,
  successFn,
}: RemoveSelectedBtnProps) {
  const { route, items } = data as BulkDeleteProps;
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertParams | null>(null);
  const alertMsg =
    confirmMsg || `Are you sure you want to remove selected ${route}?`;

  const handleRemoveAll = async () => {
    if (confirm(`${alertMsg}\nThis action cannot be undone.`)) {
      setIsRemoving(true);
      try {
        const remove = await bulkDelete({ route, items });
        const failed = remove.status === "error" || remove.status === "warning";

        setAlert({
          text: remove.message,
          severity: remove.status,
        });

        if (!failed && successFn) {
          successFn();
        }
      } catch (error: unknown) {
        setAlert({
          text: (error as Error).message,
          severity: "error",
        });
      } finally {
        setIsRemoving(false);
      }
    }
  };

  return (
    <div className="flex items-center my-4 gap-2">
      {alert && <AlertMessage message={alert} />}
      <Button
        size="small"
        variant="outlined"
        disabled={disabled || isRemoving}
        onClick={handleRemoveAll}
      >
        {btnLabel}
      </Button>
      {isRemoving && <span className="ml-2 text-xs">Removing...</span>}
    </div>
  );
}
