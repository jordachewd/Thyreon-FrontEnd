"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { defaultNewSiteValues as defaultVals } from "@/constants/sites/new-site-values";
import { useAdminContext } from "@/context/admin/AdminContext";
import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { CREATE_SITE_MUTATION } from "@/constants/graphql/sites/create-site.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import AdminAddNewFab from "@/components/sections/admin/shared/AdminAddNewFab";
import AddSiteForm from "../forms/AddSiteForm";
import DialogHeader from "../../shared/dialog/DialogHeader";
import DialogFooter from "../../shared/dialog/DialogFooter";
import ErrorCard from "@/components/shared/ErrorCard";

export default function AddSiteDialog() {
  const [formData, setFormData] = useState<CreateSiteData>(defaultVals);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <DialogHeader title="Add new site" onClose={handleCloseDialog} must />
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          {error && <ErrorCard mini error={error.message} />}
          <AddSiteForm data={formData} onChange={handleInputChange} />
        </DialogContent>

        <DialogActions className="!flex !m-4 !mt-0 !justify-end !items-center gap-2">
          <DialogFooter
            loading={loading}
            btnText="Register Site"
            onSubmit={handleSubmit}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
