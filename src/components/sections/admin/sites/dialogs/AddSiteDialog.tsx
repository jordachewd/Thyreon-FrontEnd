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
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { defaultNewSiteValues as defaultVals } from "@/constants/sites/new-site-values";
import { useAdminContext } from "@/context/admin/AdminContext";
import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { CREATE_SITE_MUTATION } from "@/constants/graphql/sites/create-site.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import AddSiteResponse from "../forms/AddSiteResponse";

export default function AddSiteDialog() {
  const [formData, setFormData] = useState<CreateSiteData>(defaultVals);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [siteKey, setSiteKey] = useState<string | undefined>(undefined);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const [createSite, { loading, error }] = useMutation(CREATE_SITE_MUTATION, {
    refetchQueries: [GET_MY_SITES_QUERY, "GetMySites"],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createSite({
      variables: { input: formData },
      onCompleted: (data) => {
        const response = data?.createSite;
        console.log("Create site response:", response);

        setSiteKey(response.site.apiKey);

        updateAlert({
          text: response.message,
          severity: response.status,
        });
      },
    });
  };

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      setOpenDialog(false);
      setFormData(defaultVals);
    },
    []
  );

  return (
    <>
      <AdminAddNewFab execFn={handleOpenDialog} />
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialog}
        onClose={() => handleCloseDialog()}
        aria-labelledby="add-new-site-dialog-title"
      >
        <DialogTitle id="add-new-site-dialog-title" sx={{ zIndex: 0 }}>
          <DialogHeader title="Add new site" onClose={handleCloseDialog} must />
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
            btnCancelTxt="Close"
            onSubmit={!siteKey ? handleSubmit : undefined}
            onCancel={siteKey ? handleCloseDialog : undefined}
          >
            {siteKey && !copiedKey && (
              <ErrorCard
                mini
                color="warning"
                error="You haven't copied your key. If you leave, you cannot retrieve it in the future, and you must create a new key."
                message="Make sure to copy your key before leaving this page."
              />
            )}
          </DialogFooter>
        </DialogActions>
      </Dialog>
    </>
  );
}
