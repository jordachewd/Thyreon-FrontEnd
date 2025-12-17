"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { useAddUserDialogStore } from "@/lib/stores/users/useAddUserDialogStore";
import { generatePassword } from "@/lib/utils/generate-password";
import { Dialog, DialogActions, DialogContent } from "@/components/ui";
import { useCallback, useState } from "react";
import { createUser } from "@/app/actions/users";
import AdminAddNewFab from "../../shared/AdminAddNewFab";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
import AddUserForm from "../forms/AddUserForm";

export default function AddUserDialog() {
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;
  const { open, formData, openDialog, closeDialog, setField } =
    useAddUserDialogStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await createUser({
          email: formData.email,
          password: formData.password,
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
        setError(err instanceof Error ? err.message : "Failed to create user");
      } finally {
        setLoading(false);
      }
    },
    [formData, updateAlert, closeDialog]
  );

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
      setError(null);
      closeDialog();
    },
    [closeDialog]
  );

  const handlePasswordGenerate = useCallback(() => {
    const newPassword = generatePassword(24);
    setField("password", newPassword);
  }, [setField]);

  return (
    <>
      <AdminAddNewFab execFn={openDialog} />
      <Dialog
        open={open}
        onClose={() => handleCloseDialog()}
      >
        <DialogContent>
          <DialogHeader title="Add new user" onClose={handleCloseDialog} must />
          {error && <ErrorCard mini error={error} onCloseMini={() => setError(null)} />}
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
