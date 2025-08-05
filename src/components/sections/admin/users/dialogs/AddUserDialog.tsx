"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorCard from "@/components/shared/ErrorCard";
import AdminAddNewFab from "@/components/sections/admin/shared/AdminAddNewFab";
import AddUserForm from "../forms/AddUserForm";
import DialogHeader from "../../shared/dialog/DialogHeader";
import DialogFooter from "../../shared/dialog/DialogFooter";
import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { generatePassword } from "@/lib/utils/generate-password";
import { useAdminContext } from "@/context/admin/AdminContext";
import { CREATE_USER_MUTATION } from "@/constants/graphql/users/create-user.const";
import { useAddUserDialogStore } from "@/lib/stores/users/useAddUserDialogStore";

export default function AddUserDialog() {
  const { updateAlert } = useAdminContext().alertCtx;
  const { open, formData, openDialog, closeDialog, setField } =
    useAddUserDialogStore();

  const [createUser, { loading, error, reset }] = useMutation(
    CREATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        const response = data?.createUser;
        updateAlert({
          text: response.message,
          severity: response.status,
        });

        closeDialog();
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createUser({
      variables: { input: formData },
    });
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setField(name as keyof typeof formData, value);
    },
    [setField, formData]
  );

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      reset();
      closeDialog();
    },
    [reset, closeDialog]
  );

  const handlePasswordGenerate = useCallback(() => {
    const newPassword = generatePassword(24);
    setField("password", newPassword);
  }, [setField]);

  return (
    <>
      <AdminAddNewFab execFn={openDialog} />
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={() => handleCloseDialog()}
        aria-labelledby="add-new-user-dialog-title"
      >
        <DialogTitle id="add-new-user-dialog-title" sx={{ zIndex: 0 }}>
          <DialogHeader title="Add new user" onClose={handleCloseDialog} must />
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          {error && <ErrorCard mini error={error.message} />}
          <AddUserForm
            data={formData}
            onChange={handleInputChange}
            genPassword={handlePasswordGenerate}
          />
        </DialogContent>

        <DialogActions>
          <DialogFooter
            loading={loading}
            btnSubmitTxt="Create User"
            onSubmit={handleSubmit}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
