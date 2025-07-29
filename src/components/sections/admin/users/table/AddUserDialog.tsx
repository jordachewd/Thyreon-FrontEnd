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

import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { defaultNewUserValues as defaultVals } from "@/constants/users/defaults/new-user-values";
import { defaultNewUserFields as defaultFields } from "@/constants/users/fields/new-user-fields";
import { CreateUserData } from "@/types/users/create-user-data.d";
import { UserFormErrors } from "@/types/users/user-form-errors.interface";
import { generatePassword } from "@/lib/utils/generate-password";
import { useAdminContext } from "@/context/admin/AdminContext";

import { CREATE_USER_MUTATION } from "@/constants/graphql/users/create-user.const";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import AdminAddNewFab from "@/components/sections/admin/shared/AdminAddNewFab";
import { validateUserInputs } from "@/lib/utils/validateUserInputs";
import { GET_USERS_QUERY } from "@/constants/graphql/users/get-users.const";

export default function AddUserDialog() {
  const [formData, setFormData] = useState<CreateUserData>(defaultVals);
  const [fieldErrors, setFieldErrors] = useState<UserFormErrors>({});

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [GET_USERS_QUERY, "GetAllUsers"],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateFields = validateUserInputs(formData);

    if (!validateFields.isValid) {
      setFieldErrors(validateFields.errors);
      return;
    }

    await createUser({
      variables: { input: formData },

      onCompleted: (data) => {
        const response = data?.createUser;

        updateAlert({
          text: response.message || "User created successfully",
          severity: response.status || "success",
        });

        handleResetDialog();
      },
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

  const handleResetDialog = useCallback(() => {
    setOpenDialog(false);
    setFieldErrors({});
    setFormData(defaultVals);
  }, []);

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }

      handleResetDialog();
    },
    [updateAlert, handleResetDialog]
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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <Typography variant="h4">Add new user</Typography>
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
            {error && <ErrorCard mini error={error.message} />}
            {defaultFields.map(({ label, name, type, info }) => {
              const fdValue = formData[name as keyof CreateUserData] || "";
              const hasError = fieldErrors[name as keyof UserFormErrors]?.info;
              return (
                <div key={name} className="flex flex-col w-full">
                  {name === "password" ? (
                    <div className="flex w-full items-start gap-2">
                      <TextField
                        helperText={hasError || info}
                        error={hasError ? true : false}
                        required
                        label={label}
                        type={type}
                        name={name}
                        value={fdValue}
                        onChange={handleInputChange}
                        size="small"
                      />

                      <Button
                        size="small"
                        startIcon={<i className="bi bi-stars"></i>}
                        onClick={handlePasswordGenerate}
                        className="!mt-1"
                      >
                        Generate
                      </Button>
                    </div>
                  ) : (
                    <TextField
                      helperText={hasError || info}
                      error={hasError ? true : false}
                      required
                      fullWidth
                      label={label}
                      type={type}
                      name={name}
                      value={fdValue}
                      onChange={handleInputChange}
                      size="small"
                    />
                  )}
                </div>
              );
            })}
          </form>
        </DialogContent>
        <DialogActions className="!flex !m-4 !mt-0 !justify-end !items-center gap-2">
          {loading && <LoadingBubbles className="!w-auto" />}
          <Button onClick={handleSubmit} variant="contained" size="small">
            {loading ? "Creating ..." : " Create User"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
