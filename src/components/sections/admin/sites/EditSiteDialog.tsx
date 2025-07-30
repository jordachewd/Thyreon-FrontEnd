"use client";

import { useCallback, useEffect, useState } from "react";
import { UPDATE_SITE_MUTATION } from "@/constants/graphql/sites/update-site.const";
import { defaultUpdateSiteFields as defaultFields } from "@/constants/sites/update-site-fields";
import { defaultUpdateSiteValues as defaultVals } from "@/constants/sites/update-site-values";
import { useAdminContext } from "@/context/admin/AdminContext";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { SiteFormErrors } from "@/types/sites/site-form-errors.d";
import { UpdateSiteData } from "@/types/sites/update-site-data.d";
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
import { validateSiteInputs } from "@/lib/utils/validateSiteInputs";
import { usePathname } from "next/navigation";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";

interface EditSiteDialogProps {
  data: GetSiteData | undefined;
  open: boolean;
  onClose: () => void;
}

export default function EditSiteDialog({
  data,
  open,
  onClose,
}: EditSiteDialogProps) {
  const [formData, setFormData] = useState<UpdateSiteData>(defaultVals);
  const [fieldErrors, setFieldErrors] = useState<SiteFormErrors>({});

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  useEffect(() => {
    if (!data) return;

    setFormData({
      id: Number(data.id),
      domain: data.domain,
      siteName: data.siteName,
    });
  }, [data]);

  const pathname = usePathname();

  const isAdminPage = pathname.includes("/allsites");
  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const [updateSite, { loading, error }] = useMutation(UPDATE_SITE_MUTATION, {
    refetchQueries: queriesToRefetch,
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    const validateFields = validateSiteInputs(formData);

    if (!validateFields.isValid) {
      setFieldErrors(validateFields.errors);
      return;
    }

    try {
      await updateSite({
        variables: { input: formData },
        onCompleted: (data) => {
          updateAlert({
            text: data?.updateSite.message,
            severity: data?.updateSite.status,
          });
          handleCloseDialog();
        },
      });
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while updating site.";
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
                const fdValue = formData?.[name as keyof UpdateSiteData] ?? "";

                const hasError =
                  fieldErrors[name as keyof SiteFormErrors]?.info;
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
              {loading ? "Updating ..." : "Update Site"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
