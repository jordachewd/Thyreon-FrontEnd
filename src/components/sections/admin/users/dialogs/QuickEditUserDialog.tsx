"use client";

import { useCallback, useEffect, useState } from "react";

import { defaultEditUserValues as defaultVals } from "@/constants/users/defaults/edit-user-values";
import { defaultEditUserFields as defaultFields } from "@/constants/users/fields/edit-user-fields";
import { useAdminContext } from "@/context/admin/AdminContext";

import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { validateUserInputs } from "@/lib/utils/validateUserInputs";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import { UserFormErrors } from "@/types/users/user-form-errors.interface";
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
  const [formData, setFormData] = useState<UpdateUserData>(defaultVals);
  const [fieldErrors, setFieldErrors] = useState<UserFormErrors>({});

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

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

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validateFields = validateUserInputs(formData);

    if (!validateFields.isValid) {
      setFieldErrors(validateFields.errors);
      return;
    }

    try {
      await updateUser({
        variables: { input: formData },
        onCompleted: (data) => {
          updateAlert({
            text: data?.updateUser.message,
            severity: data?.updateUser.status,
          });
          handleCloseDialog();
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

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }
      setFieldErrors({});
      onClose();
    },
    []
  );

  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => handleCloseDialog()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ zIndex: 0 }}>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <Typography variant="h4">Edit site details</Typography>
              <span className="text-red-600 textxxs leading-none">
                * required
              </span>
            </div>
            <Button onClick={handleCloseDialog} size="small">
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </DialogTitle>

        <DialogContent sx={{ paddingTop: "1rem!important" }}>
          <form className="flex flex-col w-full gap-3">
            {defaultFields.map(
              ({ label, name, type, required, info, disabled }) => {
                const fdValue = formData?.[name as keyof UpdateUserData] ?? "";

                const hasError =
                  fieldErrors[name as keyof UserFormErrors]?.info;
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
          <div className="flex gap-3 items-center">&nbsp;</div>
          <div className="flex gap-3 items-center">
            {loading && <LoadingBubbles className="!w-auto" />}
            <Button onClick={handleSubmit} variant="outlined" size="small">
              {loading ? "Updating ..." : "Update User"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
