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
import { defaultNewSiteValues as defaultVals } from "@/constants/sites/new-site-values";
import { defaultNewSiteFields as defaultFields } from "@/constants/sites/new-site-fields";

import { generatePassword } from "@/lib/utils/generate-password";
import { useAdminContext } from "@/context/admin/AdminContext";
import { alertDefaults } from "@/context/admin/constants/alert-defaults.const";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import AdminAddNewFab from "@/components/sections/admin/AdminAddNewFab";
import { validateSiteInputs } from "@/lib/utils/validateSiteInputs";

import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { AddSiteErrors } from "@/types/sites/add-site-errors.d";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-sites.const";
import { CREATE_SITE_MUTATION } from "@/constants/graphql/sites/create-site.const";

export default function AddSiteDialog() {
  const [formData, setFormData] = useState<CreateSiteData>(defaultVals);
  const [fieldErrors, setFieldErrors] = useState<AddSiteErrors>({});

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;
  const clearAlert = alertDefaults.message;

  const [createSite, { loading, error }] = useMutation(CREATE_SITE_MUTATION, {
    refetchQueries: [GET_SITES_QUERY, "GetSites"],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validateFields = validateSiteInputs(formData);

    if (!validateFields.isValid) {
      setFieldErrors(validateFields.errors);
      return;
    }

    await createSite({
      variables: { input: formData },

      onCompleted: (data) => {
        const response = data?.createSite;

        console.log("Create site response:", response);

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
      updateAlert(clearAlert);
      handleResetDialog();
    },
    [updateAlert, clearAlert, handleResetDialog]
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
              <Typography variant="h4">Add new site</Typography>
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
              const fdValue = formData[name as keyof CreateSiteData] || "";
              const hasError = fieldErrors[name as keyof AddSiteErrors]?.info;
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
            {loading ? "Creating..." : " Create User"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
