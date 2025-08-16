"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { UPDATE_USER_MUTATION } from "@/constants/graphql/users/update-user.const";
import { useAdminContext } from "@/context/AdminContext";
import { useEditUserDialogStore } from "@/lib/stores/users/useEditUserDialogStore";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import AdminAddNewFab from "../../shared/AdminAddNewFab";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
import EditUserForm from "../forms/EditUserForm";

interface EditUserDialogProps {
  data: Partial<GetUserData> | undefined;
}

export default function EditUserDialog({ data }: EditUserDialogProps) {
  const { updateAlert } = useAdminContext().alertCtx;
  const { open, formData, openDialog, closeDialog, setField, setFormData } =
    useEditUserDialogStore();

  const [updateUser, { loading, error, reset }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        updateAlert({
          text: data?.updateUser.message,
          severity: data?.updateUser.status,
        });
        closeDialog();
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateUser({
      variables: { input: formData },
    });
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setField(name as keyof Partial<GetUserData>, value);
    },
    [setField]
  );

  const handleInitialFormData = useCallback(
    (account?: Partial<GetUserData>) => {
      if (!account) return;
      setFormData({
        clerkId: account.clerkId,
        username: account.username,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
      });
    },
    [setFormData]
  );

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      reset();
      closeDialog();
      handleInitialFormData(data);
    },
    [reset, closeDialog, handleInitialFormData, data]
  );

  useEffect(() => {
    if (!data) return;
    handleInitialFormData(data);
  }, [data, handleInitialFormData]);

  return (
    <>
      <AdminAddNewFab
        icon="bi-pen"
        tooltipTitle="Edit User"
        execFn={openDialog}
      />

      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={() => handleCloseDialog()}
        aria-labelledby="edit-user-dialog-title"
      >
        <DialogTitle id="edit-user-dialog-title" sx={{ zIndex: 0 }}>
          <DialogHeader
            must
            title="Edit user details"
            onClose={handleCloseDialog}
          />
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          {error && (
            <ErrorCard mini error={error.message} onCloseMini={reset} />
          )}
          <EditUserForm data={formData} onChange={handleInputChange} />
        </DialogContent>

        <DialogActions>
          <DialogFooter
            loading={loading}
            btnSubmitTxt="Update User"
            onSubmit={handleSubmit}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
