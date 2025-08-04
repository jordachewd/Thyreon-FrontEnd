"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorCard from "@/components/shared/ErrorCard";
import EditUserForm from "../forms/EditUserForm";
import DialogHeader from "../../shared/dialog/DialogHeader";
import DialogFooter from "../../shared/dialog/DialogFooter";
import { useCallback, useEffect, useState } from "react";
import { defaultEditUserValues as defaultVals } from "@/constants/users/defaults/edit-user-values";
import { useAdminContext } from "@/context/admin/AdminContext";
import { useMutation } from "@apollo/client";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UPDATE_USER_MUTATION } from "@/constants/graphql/users/update-user.const";

interface QuickEditUserProps {
  data: GetUserData | undefined;
  open: boolean;
  onClose: () => void;
}

export default function QuickEditUserDialog({
  data,
  open,
  onClose,
}: QuickEditUserProps) {
  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

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
      variables: { input: formData },
    });
  };

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
      onClose();
    },
    []
  );

  useEffect(() => {
    if (!data) return;

    setFormData({
      clerkId: data.clerkId,
      username: data.username,
      email: data.email,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
    });
  }, [data]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ zIndex: 0 }}>
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
  );
}
