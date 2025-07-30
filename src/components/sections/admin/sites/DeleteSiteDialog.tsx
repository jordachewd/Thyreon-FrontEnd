"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { DELETE_SITES } from "@/constants/graphql/sites/delete-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";

import { useAdminContext } from "@/context/admin/AdminContext";
import { GetSiteData } from "@/types/sites/get-site-data.d";

import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Typography from "@mui/material/Typography";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

interface DeleteSiteDialogProps {
  data: GetSiteData | undefined;
  open: boolean;
  onClose: () => void;
}

export default function DeleteSiteDialog({
  data,
  open,
  onClose,
}: DeleteSiteDialogProps) {
  const pathname = usePathname();

  const isAdminPage = pathname.includes("/allsites");
  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const [deleteSites, { loading, error }] = useMutation(DELETE_SITES, {
    refetchQueries: queriesToRefetch,
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteSites({
        variables: { siteIds: [Number(data?.id)] },
        onCompleted: (data) => {
          updateAlert({
            text: data?.deleteSites.message,
            severity: data?.deleteSites.status,
          });
          handleCloseDialog();
        },
      });
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while deleting the site.";
      const errorMessage = (error as Error).message || defaultMsg;
      console.log(errorMessage);
    }
  };

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }
      onClose();
    },
    []
  );

  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => handleCloseDialog()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ zIndex: 0 }}>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <Typography variant="h4">Remove site registration</Typography>
            </div>
            <Button onClick={handleCloseDialog} size="small">
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          <Typography variant="body1">
            Are you sure you want to delete <b>{data?.domain}</b>?
          </Typography>
          <p className="font-semibold !my-2">
            <span className="text-red-500 uppercase">warning: </span>This action
            cannot be undone!
          </p>
          {error && <ErrorCard mini error={error.message} />}
        </DialogContent>
        <DialogActions className="!flex !m-4 !mt-0 !justify-between !items-center">
          <div className="flex gap-3 items-center">
            <Button
              onClick={handleCloseDialog}
              size="small"
              variant="outlined"
              color="info"
            >
              Cancel
            </Button>
          </div>
          <div className="flex gap-3 items-center">
            {loading && <LoadingBubbles className="!w-auto" />}
            <Button
              onClick={handleSubmit}
              variant="outlined"
              size="small"
              color="error"
            >
              {loading ? "Deleting ..." : "Delete Site"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
