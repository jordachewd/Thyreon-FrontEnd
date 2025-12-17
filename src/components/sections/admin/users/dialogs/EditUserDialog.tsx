"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import {
  UPDATE_USER_MUTATION,
  UpdateUserMutationResponse,
} from "@/constants/graphql/users/update-user.const";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useEditUserDialogStore } from "@/lib/stores/users/useEditUserDialogStore";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { useMutation } from "@apollo/client/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { memo, useCallback, useEffect } from "react";
import AdminAddNewFab from "../../shared/AdminAddNewFab";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
import EditUserForm from "../forms/EditUserForm";

interface EditUserDialogProps {
  data: GetUserInfo;
}

function EditUserDialog({ data }: EditUserDialogProps) {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;
  const { open, formData, openDialog, closeDialog, setField, setFormData } =
    useEditUserDialogStore();

  const [updateUser, { loading, error, reset }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        const { updateUser } = data as UpdateUserMutationResponse;
        updateAlert({
          text: updateUser.message,
          severity: updateUser.status,
        });
        closeDialog();
      },
    }
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await updateUser({
        variables: { input: formData },
      });
    },
    [updateUser, formData]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setField(name as keyof GetUserInfo, value);
    },
    [setField]
  );

  const handleInitialFormData = useCallback(
    (account?: GetUserInfo) => {
      if (!account) return;
      setFormData({
        clerkId: account.clerkId,
        role: account.role,
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

export default memo(EditUserDialog);
