"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { DELETE_SITES } from "@/constants/graphql/sites/delete-sites.const";
import { useAdminUi } from "@/context/AdminUiContext";
import { RefetchQueryType } from "@/types/common/refetch-query.d";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
} from "@mui/material";
import { useCallback } from "react";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";

interface DeleteSiteDialogProps {
  siteData: Partial<GetSiteData> | undefined;
  open: boolean;
  onClose: () => void;
  refetchQuery?: RefetchQueryType;
}

export default function DeleteSiteDialog({
  siteData,
  open,
  onClose,
  refetchQuery = [],
}: DeleteSiteDialogProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const [deleteSites, { loading, error }] = useMutation(DELETE_SITES, {
    refetchQueries: refetchQuery,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      updateAlert({
        text: data?.deleteSites.message,
        severity: data?.deleteSites.status,
      });
      handleCloseDialog();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await deleteSites({
      variables: { ids: [Number(siteData?.id)] },
    });
  };

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      onClose();
    },
    []
  );

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="delete-site-dialog-title"
    >
      <DialogTitle id="delete-site-dialog-title" sx={{ zIndex: 0 }}>
        <DialogHeader title="Remove site" onClose={handleCloseDialog} />
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "1rem!important" }}>
        {error && <ErrorCard mini error={error.message} />}
        <Typography variant="body1">
          Are you sure you want to delete <b>{siteData?.domain}</b>?
        </Typography>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            label="Automatically uninstall WP Guard Client plugin from my site."
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.875rem;",
                fontStyle: "italic",
              },
            }}
          />
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnColor="error"
          btnSubmitTxt="Delete Site"
          onSubmit={handleSubmit}
        >
          <ErrorCard
            mini
            color="warning"
            error="This action cannot be undone!"
            message="All data associated with this site will be permanently deleted."
          />
        </DialogFooter>
      </DialogActions>
    </Dialog>
  );
}
