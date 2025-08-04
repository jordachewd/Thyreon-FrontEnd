"use client";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import ErrorCard from "@/components/shared/ErrorCard";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
import Dialog from "@mui/material/Dialog";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { DELETE_SITES } from "@/constants/graphql/sites/delete-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { useAdminContext } from "@/context/admin/AdminContext";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useMutation } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface DeleteSiteDialogProps {
  siteData: Partial<GetSiteData> | undefined;
  open: boolean;
  onClose: () => void;
}

export default function DeleteSiteDialog({
  siteData,
  open,
  onClose,
}: DeleteSiteDialogProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/allsites");
  const { updateAlert } = useAdminContext().alertCtx;

  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const [deleteSites, { loading, error }] = useMutation(DELETE_SITES, {
    refetchQueries: queriesToRefetch,
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
      variables: { siteIds: [Number(siteData?.id)] },
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
