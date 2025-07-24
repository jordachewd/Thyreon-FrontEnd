"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useEffect, useCallback } from "react";
import { validateUserInputs } from "@/lib/utils/validateUserInputs";
import { defaultEditUserValues as defaultVals } from "@/constants/users/defaults/edit-user-values";
import { defaultEditUserFields as defaultFields } from "@/constants/users/fields/edit-user-fields";
import { NewUserFormErrors } from "@/types/users/user-add-errors.interface";
import { useAdminContext } from "@/context/admin/AdminContext";
import { alertDefaults } from "@/context/admin/constants/alert-defaults.const";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/constants/graphql/users/update-user.const";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import AdminAddNewFab from "@/components/sections/admin/AdminAddNewFab";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import { useRouter } from "next/navigation";
import DeleteUserBtn from "./DeleteUserBtn";

interface EditUserDialogProps {
  data: { profile: GetUserData | undefined };
}

export default function EditUserDialog({ data }: EditUserDialogProps) {
  const [formData, setFormData] = useState<UpdateUserData>(defaultVals);
  const [fieldErrors, setFieldErrors] = useState<NewUserFormErrors>({});

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const clearAlert = alertDefaults.message;
  const router = useRouter();

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

  const isAdmin = data?.profile?.role === "admin";

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    const validateFields = validateUserInputs(formData);

    if (!validateFields.isValid) {
      setFieldErrors(validateFields.errors);
      return;
    }

    try {
      await updateUser({
        variables: { input: { ...formData } },
        onCompleted: (data) => {
          updateAlert({
            text: data?.updateUser.message || "User updated successfully",
            severity: data?.updateUser.status || "success",
          });
          handleResetDialog();
        },
      });
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while updating user.";
      const errorMessage = (error as Error).message || defaultMsg;
      console.log(errorMessage);
    }
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

  const handleResetDialog = useCallback(() => {
    setOpenDialog(false);
    setFieldErrors({});
  }, []);

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }
      updateAlert(clearAlert);
      handleResetDialog();
    },
    [updateAlert, clearAlert, handleResetDialog]
  );

  const handleUserDeletion = useCallback(() => {
    handleResetDialog();
    router.push("/users");
  }, [router, handleResetDialog]);

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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ zIndex: 0 }}>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <Typography variant="h4">Edit user details</Typography>
              <span className="text-red-600 textxxs leading-none">
                * required
              </span>
            </div>
            <Button onClick={handleCloseDialog} size="small">
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </DialogTitle>

        <DialogContent
          sx={{ paddingTop: "1.25rem!important", paddingBottom: "0!important" }}
        >
          <form className="flex flex-col w-full gap-3">
            {defaultFields.map(
              ({ label, name, type, required, info, disabled }) => {
                const fdValue = formData?.[name as keyof UpdateUserData] ?? "";

                const hasError =
                  fieldErrors[name as keyof NewUserFormErrors]?.info;
                return (
                  <div key={name} className="flex flex-col w-full">
                    <TextField
                      helperText={hasError || info}
                      error={hasError ? true : false}
                      required={required}
                      fullWidth
                      label={label}
                      type={type}
                      name={name}
                      value={fdValue}
                      disabled={disabled}
                      onChange={handleInputChange}
                      size="small"
                    />
                  </div>
                );
              }
            )}
            {error && <ErrorCard mini error={error.message} />}
          </form>
        </DialogContent>
        <DialogActions className="!flex !m-4 !mt-0 !justify-between !items-center">
          <div className="flex gap-3 items-center">
            <DeleteUserBtn
              users={[data?.profile as GetUserData]}
              disabled={isAdmin}
              onSuccess={handleUserDeletion}
            />
            {isAdmin && (
              <span className="textxxs text-gray-400">
                Admin users cannot be deleted.
              </span>
            )}
          </div>
          <div className="flex gap-3 items-center">
            {loading && <LoadingBubbles className="!w-auto" />}
            <Button onClick={handleSubmit} variant="contained" size="small">
              {loading ? "Updating ..." : "Update User"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
