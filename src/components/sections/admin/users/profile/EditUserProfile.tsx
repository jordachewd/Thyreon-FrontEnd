"use client";
import css from "./EditUserProfile.module.css";
import { Button } from "@mui/material";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import SectionFormField from "../../fields/SectionFormField";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { AlertParams } from "@/types/alert-message.interface";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import RemoveSelectedBtn from "../table/RemoveSelectedBtn";
import AlertMessage from "@/components/layout/common/AlertMessage";
import updateUser from "@/lib/actions/users/update";
import { defaultEditUserFields } from "@/constants/users/fields/edit-user-fields";
import { UpdateUserErrors } from "@/types/users/user-update-errors";
import { validateSectionField } from "@/lib/utils/validateSectionField";

interface EditUserProps {
  userData: GetUserData;
}

export default function EditUserProfile({ userData }: EditUserProps) {
  const router = useRouter();

  const isAdmin = userData.role === ("admin" as UserRole);

  const [alert, setAlert] = useState<AlertParams | null>(null);
  const [formData, setFormData] = useState<UpdateUserData>(userData);
  const [fieldErrors, setFieldErrors] = useState<UpdateUserErrors>({});
  const [isUpdatingUser, setIsUpdatingUser] = useState<boolean>(false);

  const inputRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    setIsUpdatingUser(true);

    const newData: UpdateUserData = { ...formData };

    (Object.keys(inputRefs.current) as (keyof UpdateUserData)[]).forEach(
      (key) => {
        const inputRef = inputRefs.current[key as string];

        if (inputRef) {
          const value = inputRef.value;

          if (
            typeof formData[key] === "string" ||
            formData[key] === undefined
          ) {
            (newData[key] as string) = value;
          }
        }
      }
    );

    const validateFields = validateSectionField<UpdateUserData>(newData);

    if (validateFields.isValid) {
      setFieldErrors({});

      try {
        const updateUserData = await updateUser(newData);

        if (updateUserData.error || updateUserData.status === "error") {
          setAlert({
            text: Array.isArray(updateUserData.message)
              ? updateUserData.message.join(", ")
              : updateUserData.message || "An error occurred",
            severity: "error",
          });
        } else {
          setAlert({
            text: "User profile updated successfully",
            severity: "success",
          });
          setFormData(newData);
        }
      } catch (error) {
        console.error("Error updating user profile: ", error);
        setAlert({
          text: "Failed to update user profile. Please try again.",
          severity: "error",
        });
      }
    } else {
      setFieldErrors(validateFields.errors);
    }

    setIsUpdatingUser(false);
  };

  return (
    <>
      {alert && <AlertMessage message={alert} />}

      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.fields}>
          {defaultEditUserFields.map((field) => (
            <SectionFormField<UpdateUserData, UpdateUserErrors>
              key={field.name}
              field={field}
              errors={fieldErrors}
              formData={formData}
              inputRefs={inputRefs}
              setFormData={setFormData}
            />
          ))}
          <div className={css.actions}>
            <span className={css.required}>* required</span>
            {isUpdatingUser && <LoadingBubbles />}
            <Button
              variant="contained"
              onClick={handleSubmit}
              endIcon={<i className="bi bi-cloud-arrow-up"></i>}
            >
              Update
            </Button>
          </div>
        </div>
      </form>

      <div className="flex my-2 gap-3 items-center">
        <RemoveSelectedBtn
          disabled={isAdmin}
          btnLabel="Delete Account"
          data={{ route: "users", items: { users: [userData] } }}
          successFn={() => router.push("/users")}
          confirmMsg={`Are you sure you want to delete '${userData.username}'?`}
        />
        {isAdmin && (
          <span className="text-xs text-gray-400">
            Admin users cannot be deleted.
          </span>
        )}
      </div>
    </>
  );
}
