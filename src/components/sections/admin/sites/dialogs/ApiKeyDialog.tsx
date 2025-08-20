"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { GET_SITE_BY_ID } from "@/constants/graphql/sites/get-site-by-id.const";
import { REGENERATE_API_KEY } from "@/constants/graphql/sites/new-api-key";
import { useAdminUi } from "@/context/AdminUiContext";
import { useApiKeyDialogStore } from "@/lib/stores/sites/useApiKeyDialogStore";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import { useRef, useCallback, useEffect } from "react";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
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

  const [regenerateApiKey, { loading, error }] = useMutation(
    REGENERATE_API_KEY,
    {
      refetchQueries: [GET_SITE_BY_ID, "GetSiteById"],
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const newData = data.regenerateApiKey;
        setNewKey(newData.site.apiKey);
        setAlertMsg({
          text: newData.message,
          severity: newData.status,
        });
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await regenerateApiKey({
      variables: { id: Number(siteData?.id) },
    });
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
      <DialogTitle id="regenerate-api-key-dialog-title" sx={{ zIndex: 0 }}>
        <DialogHeader
          title={newKey ? "Next ..." : "Generate API key"}
          onClose={handleCloseDialog}
        />
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "1rem!important" }}>
        {error && <ErrorCard mini error={error.message} />}
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
