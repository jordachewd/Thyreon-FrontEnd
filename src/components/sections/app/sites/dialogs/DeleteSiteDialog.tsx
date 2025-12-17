"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Checkbox,
} from "@/components/ui";
import { useCallback, useState } from "react";
import { deleteSites } from "@/app/actions/sites";
import DialogFooter from "../../../admin/shared/dialog/DialogFooter";
import DialogHeader from "../../../admin/shared/dialog/DialogHeader";

interface DeleteSiteDialogProps {
  siteData: Partial<GetSiteData> | undefined;
  open: boolean;
  onClose: () => void;
}

export default function DeleteSiteDialog({
  siteData,
  open,
  onClose,
}: DeleteSiteDialogProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!siteData?.id) {
      setError("Site ID is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await deleteSites([Number(siteData.id)]);
      updateAlert({
        text: result.message,
        severity: result.status,
      });
      handleCloseDialog();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      onClose();
    },
    [onClose]
  );

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="delete-site-dialog-title"
    >
      <DialogHeader title="Remove site" onClose={handleCloseDialog} />

      <DialogContent>
        {error && <ErrorCard mini error={error} />}
        <Typography variant="body1">
          Are you sure you want to delete <b>{siteData?.domain}</b>?
        </Typography>

        <Checkbox
          defaultChecked
          label="Automatically uninstall WP Guard Client plugin from my site."
        />
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnSubmitTxt="Delete Site"
          onSubmit={handleSubmit}
        >
          <ErrorCard
            mini
            color="warning"
            error="This action cannot be undone!"
            message="All data associated with this site will be permanently deleted."
          />
        </DialogFooter>
      </DialogActions>
    </Dialog>
  );
}
