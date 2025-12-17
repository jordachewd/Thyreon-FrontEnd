"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import {
  UPDATE_SITE_MUTATION,
  UpdateSiteMutationResponse,
} from "@/constants/graphql/sites/update-site.const";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useEditSiteDialogStore } from "@/lib/stores/sites/useEditSiteDialogStore";
import { RefetchQueryType } from "@/types/common/refetch-query.d";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useMutation } from "@apollo/client/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import DialogFooter from "../../../admin/shared/dialog/DialogFooter";
import DialogHeader from "../../../admin/shared/dialog/DialogHeader";
import UpdateSiteForm from "../forms/UpdateSiteForm";

interface EditSiteDialogProps {
  siteData: Partial<GetSiteData> | undefined;
  open: boolean;
  onClose: () => void;
  refetchQuery?: RefetchQueryType;
}

export default function EditSiteDialog({
  siteData,
  open,
  onClose,
  refetchQuery = [],
}: EditSiteDialogProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const { formData, setField, setFormData, resetDialog } =
    useEditSiteDialogStore();

  const [updateSite, { loading, error }] = useMutation(UPDATE_SITE_MUTATION, {
    refetchQueries: refetchQuery,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const { updateSite } = data as UpdateSiteMutationResponse;
      updateAlert({
        text: updateSite.message,
        severity: updateSite.status,
      });
      handleCloseDialog();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateSite({
      variables: {
        id: Number(formData.id),
        input: { ...formData, id: Number(formData.id) },
      },
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
        <DialogHeader must title="Edit details" onClose={handleCloseDialog} />
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "1rem!important" }}>
        {error && <ErrorCard mini error={error.message} />}
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
