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
import { useState } from "react";
import { validateNewUserFields } from "@/lib/utils/validateNewUserFields";
import { defaultNewUserValues as defaultVals } from "@/constants/users/defaults/new-user-values";
import { defaultNewUserFields as defaultFields } from "@/constants/users/fields/new-user-fields";
import createUser from "@/lib/actions/users/create-user";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import AdminAddNewButton from "../../AdminAddNewFab";
import { CreateUserData } from "@/types/users/create-user-data.d";
import { NewUserFormErrors } from "@/types/users/user-add-errors.interface";
import { generatePassword } from "@/lib/utils/generate-password";
import { useAdminContext } from "@/context/admin/AdminContext";
import { alertDefaults } from "@/context/admin/constants/alert-defaults.const";

export default function AddNewUserDialog() {
  const [formData, setFormData] = useState<CreateUserData>(defaultVals);
  const [fieldErrors, setFieldErrors] = useState<NewUserFormErrors>({});
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;
  const clearAlert = alertDefaults.message;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateFields = validateNewUserFields(formData);

    if (!validateFields.isValid) {
      setFieldErrors(validateFields.errors);
      return;
    }

    setFieldErrors({});
    setIsAddingUser(true);

    try {
      const newUser = await createUser(formData);

      if (newUser.error || newUser.status === "error") {
        updateAlert({
          text: Array.isArray(newUser.message)
            ? newUser.message.join(", ")
            : newUser.message || "An error occurred",
          severity: "error",
        });
        return;
      } else {
        updateAlert({
          text: newUser.message,
          severity: newUser.status,
        });
      }
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while creating the user.";
      const errorMsg = error instanceof Error ? error.message : defaultMsg;

      updateAlert({
        text: errorMsg,
        severity: "error",
      });
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (e?: React.MouseEvent | React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    updateAlert(clearAlert);
    setOpenDialog(false);
    setFieldErrors({});
    setFormData(defaultVals);
  };

  return (
    <>
      <AdminAddNewButton execFn={handleOpenDialog} />

      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={openDialog}
        onClose={() => handleCloseDialog()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ paddingBottom: 0 }}>
          <div className="flex w-full justify-between items-start">
            <Typography variant="h4" className="py-2!">
              Add new user
            </Typography>
            <Button onClick={handleCloseDialog} size="small">
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </DialogTitle>

        <DialogContent sx={{ paddingTop: 0 }}>
          <form className="flex flex-col w-full space-y-4 mt-4">
            {defaultFields.map(({ label, name, type }) => {
              const fdValue = formData[name as keyof CreateUserData] || "";
              const hasInfo =
                fieldErrors[name as keyof NewUserFormErrors]?.info;
              return (
                <div key={name} className="flex flex-col w-full space-x-4">
                  <div className="flex w-full justify-between m-0! items-start">
                    {name === "password" ? (
                      <>
                        <TextField
                          helperText={hasInfo}
                          error={hasInfo ? true : false}
                          required
                          label={label}
                          type={type}
                          name={name}
                          value={fdValue}
                          onChange={handleInputChange}
                          size="small"
                          sx={{
                            minWidth: "70%",
                          }}
                        />

                        <Button
                          startIcon={<i className="bi bi-stars"></i>}
                          onClick={() => {
                            const newPassword = generatePassword(24);
                            setFormData((prevData) => ({
                              ...prevData,
                              password: newPassword,
                            }));
                          }}
                        >
                          Generate
                        </Button>
                      </>
                    ) : (
                      <TextField
                        helperText={hasInfo}
                        error={hasInfo ? true : false}
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
                </div>
              );
            })}
          </form>
        </DialogContent>
        <DialogActions className="!flex m-4 justify-between!">
          <span className="text-red-600 text-xs leading-none">* required</span>
          {isAddingUser && <LoadingBubbles />}
          <Button onClick={handleSubmit} variant="contained" size="large">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
