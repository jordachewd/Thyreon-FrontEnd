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
import { useState, useEffect, useCallback } from "react";
import { defaultEditUserValues as defaultVals } from "@/constants/users/defaults/edit-user-values";
import { useAdminContext } from "@/context/admin/AdminContext";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/constants/graphql/users/update-user.const";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UpdateUserData } from "@/types/users/update-user-data.d";

interface EditUserDialogProps {
  data: { profile: GetUserData | undefined };
}

export default function EditUserDialog({ data }: EditUserDialogProps) {
  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [formData, setFormData] = useState<UpdateUserData>(defaultVals);

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
      variables: { input: { ...formData } },
    });
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      setOpenDialog(false);
    },
    []
  );

  useEffect(() => {
    if (!data?.profile) return;
    const user = data.profile as GetUserData;

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
        execFn={handleOpenDialog}
      />

      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialog}
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
