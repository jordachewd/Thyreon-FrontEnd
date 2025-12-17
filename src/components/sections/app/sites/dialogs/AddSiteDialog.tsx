"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useAddSiteDialogStore } from "@/lib/stores/sites/useAddSiteDialogStore";
import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { Dialog, DialogActions, DialogContent } from "@/components/ui";
import { useRef, useCallback, useEffect, useState } from "react";
import { createSite } from "@/app/actions/sites";
import AdminAddNewFab from "../../../admin/shared/AdminAddNewFab";
import DialogFooter from "../../../admin/shared/dialog/DialogFooter";
import DialogHeader from "../../../admin/shared/dialog/DialogHeader";
import AddSiteForm from "../forms/AddSiteForm";
import AddSiteResponse from "../forms/AddSiteResponse";

export default function AddSiteDialog() {
  const closingAttemptedRef = useRef(false);
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const {
    open,
    formData,
    siteKey,
    copiedKey,
    showCopyWarning,
    alertMsg,
    openDialog,
    closeDialog,
    resetDialog,
    setField,
    setSiteKey,
    setCopiedKey,
    setShowCopyWarning,
    setAlertMsg,
  } = useAddSiteDialogStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => setError(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.domain) {
      setError("Domain is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createSite({
        domain: formData.domain,
        siteName: formData.siteName,
      });
      setSiteKey(result.site?.apiKey || '');
      setAlertMsg({
        text: result.message,
        severity: result.status,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setField(name as keyof CreateSiteData, value);
    },
    [setField]
  );

  const handleOnExit = useCallback(() => {
    reset();
    closeDialog();
    if (alertMsg) updateAlert(alertMsg);
    closingAttemptedRef.current = false;
  }, [reset, closeDialog, alertMsg, updateAlert]);

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();

      if (siteKey && !copiedKey) {
        if (!closingAttemptedRef.current) {
          closingAttemptedRef.current = true;
          setShowCopyWarning(true);
        } else {
          handleOnExit();
        }
      } else {
        handleOnExit();
      }
    },
    [handleOnExit, siteKey, copiedKey, setShowCopyWarning]
  );

  useEffect(() => {
    if (open) {
      closingAttemptedRef.current = false;
      resetDialog();
    }
  }, [open, resetDialog]);

  return (
    <>
      <AdminAddNewFab execFn={openDialog} />
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={() => handleCloseDialog()}
        aria-labelledby="add-new-site-dialog-title"
      >
        <DialogHeader
          must={!siteKey}
          title={siteKey ? "Next step ..." : "Add new site"}
          onClose={handleCloseDialog}
        />

        <DialogContent>
          {error && (
            <ErrorCard mini error={error} onCloseMini={reset} />
          )}
          {!siteKey && (
            <AddSiteForm data={formData} onChange={handleInputChange} />
          )}
          {siteKey && (
            <AddSiteResponse
              apiKey={siteKey}
              onResponse={() => setCopiedKey(true)}
            />
          )}
        </DialogContent>

        <DialogActions>
          <DialogFooter
            loading={loading}
            btnSubmitTxt="Register Site"
            onSubmit={!siteKey ? handleSubmit : undefined}
          >
            {showCopyWarning && (
              <ErrorCard
                mini
                color="warning"
                error="Make sure to copy your key before leaving this page."
                message="If you leave, you cannot retrieve it in the future, and you must generate a new key."
              />
            )}
          </DialogFooter>
        </DialogActions>
      </Dialog>
    </>
  );
}
