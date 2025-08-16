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
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
import EditUserForm from "../forms/EditUserForm";

interface QuickEditUserProps {
  data: Partial<GetUserData> | undefined;
  open: boolean;
  onClose: () => void;
}

export default function QuickEditUserDialog({
  data,
  open,
  onClose,
}: QuickEditUserProps) {
  const { updateAlert } = useAdminContext().alertCtx;
  const { formData, setField, setFormData } = useEditUserDialogStore();

  const [updateUser, { loading, error, reset }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        updateAlert({
          text: data?.updateUser.message,
          severity: data?.updateUser.status,
        });
        onClose();
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
    [setFormData]
  );

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      reset();
      onClose();
    },
    [reset, onClose]
  );

  useEffect(() => {
    if (!data) return;
    setFormData({
      clerkId: data.clerkId,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
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
        {error && <ErrorCard mini error={error.message} onCloseMini={reset} />}
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
