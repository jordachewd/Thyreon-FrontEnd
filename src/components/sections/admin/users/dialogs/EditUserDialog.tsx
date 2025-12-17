"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useEditUserDialogStore } from "@/lib/stores/users/useEditUserDialogStore";
import { GetUserInfo } from "@/types/users/get-user-info.d";
import { Dialog, DialogActions, DialogContent } from "@/components/ui";
import { memo, useCallback, useEffect, useState } from "react";
import { updateUser } from "@/app/actions/users";
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.clerkId) {
        setError("User ID is required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await updateUser({
          clerkId: formData.clerkId,
          email: formData.email,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        });
        updateAlert({
          text: result.message,
          severity: result.status,
        });
        closeDialog();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update user");
      } finally {
        setLoading(false);
      }
    },
    [formData, updateAlert, closeDialog]
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
      setError(null);
      closeDialog();
      handleInitialFormData(data);
    },
    [closeDialog, handleInitialFormData, data]
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
        open={open}
        onClose={() => handleCloseDialog()}
        title="Edit user details"
      >
        <DialogContent>
          <DialogHeader must title="Edit user details" onClose={handleCloseDialog} />
          {error && (
            <ErrorCard mini error={error} onCloseMini={() => setError(null)} />
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
