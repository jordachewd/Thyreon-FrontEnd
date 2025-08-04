"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorCard from "@/components/shared/ErrorCard";
import AdminAddNewFab from "@/components/sections/admin/shared/AdminAddNewFab";
import DialogHeader from "../../shared/dialog/DialogHeader";
import EditUserForm from "../forms/EditUserForm";
import DialogFooter from "../../shared/dialog/DialogFooter";
import { useEffect, useCallback } from "react";
import { useAdminContext } from "@/context/admin/AdminContext";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/constants/graphql/users/update-user.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { useEditUserDialogStore } from "@/lib/stores/users/useEditUserDialogStore";

interface EditUserDialogProps {
  data: { profile: Partial<GetUserData> | undefined };
}

export default function EditUserDialog({ data }: EditUserDialogProps) {
  const { updateAlert } = useAdminContext().alertCtx;
  const { open, formData, openDialog, closeDialog, setField, setFormData } =
    useEditUserDialogStore();

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: (data) => {
      updateAlert({
        text: data?.updateUser.message,
        severity: data?.updateUser.status,
      });
      handleCloseDialog();
    },
  });

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

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      closeDialog();
    },
    [closeDialog]
  );

  useEffect(() => {
    if (!data?.profile) return;
    const user = data.profile;
    setFormData({
      clerkId: user.clerkId,
      username: user.username,
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    });
  }, [data?.profile]);

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
          {error && <ErrorCard mini error={error.message} />}
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
