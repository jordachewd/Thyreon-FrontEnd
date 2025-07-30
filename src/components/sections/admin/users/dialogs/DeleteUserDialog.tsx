"use client";

import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useAdminContext } from "@/context/admin/AdminContext";
import { DELETE_USERS } from "@/constants/graphql/users/delete-users.const";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

interface DeleteUserDialog {
  data: GetUserData | undefined;
  open: boolean;
  onClose: () => void;
}

export default function DeleteUserDialog({
  data,
  open,
  onClose,
}: DeleteUserDialog) {
  const [deleteUsers, { loading, error }] = useMutation(DELETE_USERS);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteUsers({
        variables: { clerkIds: [data?.clerkId] },
        onCompleted: (data) => {
          updateAlert({
            text: data?.deleteUsers.message,
            severity: data?.deleteUsers.status,
          });
          handleCloseDialog();
        },
      });
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while deleting the user.";
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
              <Typography variant="h4">Remove user</Typography>
            </div>
            <Button onClick={handleCloseDialog} size="small">
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          <Typography variant="body1">
            Are you sure you want to delete <b>{data?.username}</b>?
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
              {loading ? "Deleting ..." : "Delete User"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
