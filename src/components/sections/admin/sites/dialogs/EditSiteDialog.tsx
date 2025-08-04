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
import { useCallback, useEffect } from "react";
import { UPDATE_SITE_MUTATION } from "@/constants/graphql/sites/update-site.const";
import { useAdminContext } from "@/context/admin/AdminContext";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { usePathname } from "next/navigation";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { useEditSiteDialogStore } from "@/lib/stores/sites/useEditSiteDialogStore";

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
  const { formData, setField, setFormData, resetDialog } =
    useEditSiteDialogStore();

  const pathname = usePathname();
  const isAdminPage = pathname.includes("/allsites");
  const { updateAlert } = useAdminContext().alertCtx;

  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

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
      variables: { input: { ...formData, id: Number(formData.id) } },
    });
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
    [onClose, updateAlert]
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
