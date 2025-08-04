"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorCard from "@/components/shared/ErrorCard";
import DialogHeader from "../../shared/dialog/DialogHeader";
import DialogFooter from "../../shared/dialog/DialogFooter";
import UpdateSiteForm from "../forms/UpdateSiteForm";
import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { UPDATE_SITE_MUTATION } from "@/constants/graphql/sites/update-site.const";
import { defaultUpdateSiteValues as defaultVals } from "@/constants/sites/update-site-values";
import { useAdminContext } from "@/context/admin/AdminContext";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { UpdateSiteData } from "@/types/sites/update-site-data.d";
import { usePathname } from "next/navigation";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";

interface EditSiteDialogProps {
  data: GetSiteData | undefined;
  open: boolean;
  onClose: () => void;
}

export default function EditSiteDialog({
  data,
  open,
  onClose,
}: EditSiteDialogProps) {
  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const pathname = usePathname();
  const isAdminPage = pathname.includes("/allsites");

  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const [formData, setFormData] = useState<UpdateSiteData>(defaultVals);
  const [updateSite, { loading, error }] = useMutation(UPDATE_SITE_MUTATION, {
    refetchQueries: queriesToRefetch,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      updateAlert({
        text: data?.updateSite.message,
        severity: data?.updateSite.status,
      });
      handleCloseDialog();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateSite({
      variables: { input: formData },
    });
  };

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
      onClose();
    },
    []
  );

  useEffect(() => {
    if (!data) return;

    setFormData({
      id: Number(data.id),
      domain: data.domain,
      siteName: data.siteName,
    });
  }, [data]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="edit-site-dialog-title"
    >
      <DialogTitle id="edit-site-dialog-title" sx={{ zIndex: 0 }}>
        <DialogHeader
          must
          title="Edit site details"
          onClose={handleCloseDialog}
        />
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "1rem!important" }}>
        {error && <ErrorCard mini error={error.message} />}
        <UpdateSiteForm data={formData} onChange={handleInputChange} />
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnSubmitTxt="Update Site Details"
          onSubmit={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
}
