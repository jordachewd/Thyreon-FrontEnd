"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useEditSiteDialogStore } from "@/lib/stores/sites/useEditSiteDialogStore";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { Dialog, DialogActions, DialogContent } from "@/components/ui";
import { useCallback, useEffect, useState } from "react";
import { updateSite } from "@/app/actions/sites";
import DialogFooter from "../../../admin/shared/dialog/DialogFooter";
import DialogHeader from "../../../admin/shared/dialog/DialogHeader";
import UpdateSiteForm from "../forms/UpdateSiteForm";

interface EditSiteDialogProps {
  siteData: Partial<GetSiteData> | undefined;
  open: boolean;
  onClose: () => void;
}

export default function EditSiteDialog({
  siteData,
  open,
  onClose,
}: EditSiteDialogProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const { formData, setField, setFormData, resetDialog } =
    useEditSiteDialogStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id) {
      setError("Site ID is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await updateSite(Number(formData.id), {
        siteName: formData.siteName,
        domain: formData.domain,
      });
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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setField(name as keyof Partial<GetSiteData>, value);
    },
    [setField]
  );

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      onClose();
      resetDialog();
    },
    [onClose, resetDialog]
  );

  useEffect(() => {
    if (!siteData) return;
    setFormData(siteData);
  }, [siteData]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="edit-site-dialog-title"
    >
      <DialogHeader must title="Edit details" onClose={handleCloseDialog} />

      <DialogContent>
        {error && <ErrorCard mini error={error} />}
        <UpdateSiteForm data={formData} onChange={handleInputChange} />
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnSubmitTxt="Update Site"
          onSubmit={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
}
