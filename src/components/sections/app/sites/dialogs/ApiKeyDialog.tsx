"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useApiKeyDialogStore } from "@/lib/stores/sites/useApiKeyDialogStore";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@/components/ui";
import { useRef, useCallback, useEffect, useState } from "react";
import { regenerateApiKey } from "@/app/actions/sites";
import DialogFooter from "../../../admin/shared/dialog/DialogFooter";
import DialogHeader from "../../../admin/shared/dialog/DialogHeader";
import ApiKeyResponse from "../forms/ApiKeyResponse";

interface ApiKeyDialogProps {
  open: boolean;
  siteData: Partial<GetSiteData> | undefined;
  onClose: () => void;
}

export default function ApiKeyDialog({
  open,
  siteData,
  onClose,
}: ApiKeyDialogProps) {
  const {
    alertMsg,
    newKey,
    copiedKey,
    showCopyWarning,
    setAlertMsg,
    setNewKey,
    setCopiedKey,
    setShowCopyWarning,
    resetDialog,
  } = useApiKeyDialogStore();

  const closingAttemptedRef = useRef(false);
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
      const result = await regenerateApiKey(Number(siteData.id));
      setNewKey(result.site?.apiKey || '');
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

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();

      if (newKey && !copiedKey) {
        if (!closingAttemptedRef.current) {
          closingAttemptedRef.current = true;
          setShowCopyWarning(true);
        } else {
          onClose();
          if (alertMsg) updateAlert(alertMsg);
          closingAttemptedRef.current = false;
        }
      } else {
        onClose();
        if (alertMsg) updateAlert(alertMsg);
        closingAttemptedRef.current = false;
      }
    },
    [onClose, newKey, copiedKey, setShowCopyWarning, updateAlert, alertMsg]
  );

  useEffect(() => {
    if (open) {
      closingAttemptedRef.current = false;
      resetDialog();
    }
  }, [open, setShowCopyWarning]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="regenerate-api-key-dialog-title"
    >
      <DialogHeader
        title={newKey ? "Next ..." : "Generate API key"}
        onClose={handleCloseDialog}
      />

      <DialogContent>
        {error && <ErrorCard mini error={error} />}
        {!newKey && (
          <Typography variant="body1">
            Are you sure you want to generate a new API key for
            <b> {siteData?.domain}</b>?
          </Typography>
        )}
        {newKey && (
          <ApiKeyResponse
            apiKey={newKey}
            onResponse={() => setCopiedKey(true)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnSubmitTxt="Regenerate"
          onSubmit={!newKey ? handleSubmit : undefined}
        >
          {!newKey && (
            <ErrorCard
              mini
              color="warning"
              error="This action cannot be undone!"
              message="The old API key will be invalidated."
            />
          )}

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
  );
}
