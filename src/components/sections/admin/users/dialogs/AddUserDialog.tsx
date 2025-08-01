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
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { defaultNewUserValues as defaultVals } from "@/constants/users/defaults/new-user-values";
import { CreateUserData } from "@/types/users/create-user-data.d";
import { generatePassword } from "@/lib/utils/generate-password";
import { useAdminContext } from "@/context/admin/AdminContext";
import { CREATE_USER_MUTATION } from "@/constants/graphql/users/create-user.const";

export default function AddUserDialog() {
  const [formData, setFormData] = useState<CreateUserData>(defaultVals);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createUser({
      variables: { input: formData },
      onCompleted: (data) => {
        const response = data?.createUser;
        updateAlert({
          text: response.message,
          severity: response.status,
        });

        handleCloseDialog();
      },
    });
  };

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      setOpenDialog(false);
      setFormData(defaultVals);
    },
    []
  );

  const handlePasswordGenerate = useCallback(() => {
    const newPassword = generatePassword(24);
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
  }, []);

  return (
    <>
      <AdminAddNewFab execFn={handleOpenDialog} />
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialog}
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
