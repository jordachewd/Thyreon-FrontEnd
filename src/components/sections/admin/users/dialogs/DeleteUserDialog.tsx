"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { DELETE_USERS } from "@/constants/graphql/users/delete-users.const";
import { useAdminContext } from "@/context/AdminContext";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import { useCallback } from "react";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";

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
  const { updateAlert } = useAdminContext().alertCtx;
  const [deleteUsers, { loading, error }] = useMutation(DELETE_USERS, {
    onCompleted: (data) => {
      const response = data?.deleteUsers;
      updateAlert({
        text: response.message,
        severity: response.status,
      });
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await deleteUsers({
      variables: { clerkIds: [data?.clerkId] },
    });
  };

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      onClose();
    },
    [onClose]
  );

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="delete-user-dialog-title"
    >
      <DialogTitle id="delete-user-dialog-title" sx={{ zIndex: 0 }}>
        <DialogHeader title="Remove user" onClose={handleCloseDialog} />
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "1rem!important" }}>
        {error && <ErrorCard mini error={error.message} />}
        <Typography variant="body1">
          Are you sure you want to delete <b>{data?.username}</b>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnColor="error"
          btnSubmitTxt="Delete User"
          onSubmit={handleSubmit}
        >
          <ErrorCard
            mini
            color="warning"
            error="This action cannot be undone!"
            message="All user data will be permanently deleted."
          />
        </DialogFooter>
      </DialogActions>
    </Dialog>
  );
}
