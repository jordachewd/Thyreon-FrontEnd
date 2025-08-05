"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AdminAddNewFab from "@/components/sections/admin/shared/AdminAddNewFab";
import AddSiteForm from "../forms/AddSiteForm";
import DialogHeader from "../../shared/dialog/DialogHeader";
import DialogFooter from "../../shared/dialog/DialogFooter";
import ErrorCard from "@/components/shared/ErrorCard";
import AddSiteResponse from "../forms/AddSiteResponse";
import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useRef } from "react";
import { useAdminContext } from "@/context/admin/AdminContext";
import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { CREATE_SITE_MUTATION } from "@/constants/graphql/sites/create-site.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { useAddSiteDialogStore } from "@/lib/stores/sites/useAddSiteDialogStore";

export default function AddSiteDialog() {
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

  const closingAttemptedRef = useRef(false);
  const { updateAlert } = useAdminContext().alertCtx;

  const [createSite, { loading, error, reset }] = useMutation(
    CREATE_SITE_MUTATION,
    {
      refetchQueries: [GET_MY_SITES_QUERY, "GetMySites"],
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const response = data?.createSite;
        setSiteKey(response.site.apiKey);
        setAlertMsg({
          text: response.message,
          severity: response.status,
        });
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSite({
      variables: { input: formData },
    });
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
        <DialogTitle id="add-new-site-dialog-title" sx={{ zIndex: 0 }}>
          <DialogHeader
            must={!siteKey}
            title={siteKey ? "Next step ..." : "Add new site"}
            onClose={handleCloseDialog}
          />
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          {error && <ErrorCard mini error={error.message} />}
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
