"use client";

import css from "./EditUserProfile.module.css";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import SectionFormField from "../../fields/SectionFormField";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UpdateUserData } from "@/types/users/update-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import RemoveSelectedBtn from "../table/RemoveSelectedBtn";
import updateUser from "@/lib/actions/users/update";
import { defaultEditUserFields as editFields } from "@/constants/users/fields/edit-user-fields";
import { UpdateUserErrors } from "@/types/users/user-update-errors";
import { validateSectionField } from "@/lib/utils/validateSectionField";
import { useAdminContext } from "@/context/admin/AdminContext";
import ErrorCard from "@/components/shared/ErrorCard";

const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      email
      username
      firstName
      lastName
      role
      clerkImg
    }
  }
`;

interface EditUserProps {
  userId: number;
}

export default function EditUserProfile({ userId }: EditUserProps) {
  const { data, loading, error } = useQuery<{ userById: GetUserData }>(
    GET_USER_BY_ID_QUERY,
    {
      variables: { id: Number(userId) },
    }
  );

  const router = useRouter();
  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const [fieldErrors, setFieldErrors] = useState<UpdateUserErrors>({});
  const [isUpdatingUser, setIsUpdatingUser] = useState<boolean>(false);

  const inputRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({});

  const [formData, setFormData] = useState<UpdateUserData | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      setFormData(data.userById as UpdateUserData);
    }
  }, [data, formData]);

  const isUserAdmin = formData?.role === ("admin" as UserRole);

  if (loading) return <LoadingBubbles wrapped />;

  if (error)
    return <ErrorCard title="Error!" error={error.message} backToUrl="users" />;

  if (!formData)
    return (
      <ErrorCard
        title="Error!"
        error="Failed to load user data."
        backToUrl="users"
      />
    );

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
          updateAlert({
            text: Array.isArray(updateUserData.message)
              ? updateUserData.message.join(", ")
              : updateUserData.message || "Failed to update user.",
            severity: "error",
          });

          return;
        } else {
          updateAlert({
            text: `${updateUserData.message || "User updated successfully"} `,
            severity: "success",
          });

          setFormData(newData);
        }
      } catch (error: unknown) {
        const defaultMsg = "Failed to update user profile. Please try again.";
        const errorMsg = error instanceof Error ? error.message : defaultMsg;

        updateAlert({
          text: errorMsg,
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
      <div className={css.form}>
        <div className={css.fields}>
          {editFields.map((field) => (
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
      </div>

      <div className="flex my-2 gap-3 items-center">
        <RemoveSelectedBtn
          disabled={isUserAdmin}
          btnLabel="Delete Account"
          data={{ route: "users", items: { users: [formData] } }}
          successFn={() => router.push("/users")}
          confirmMsg={`Are you sure you want to delete '${formData.username}'?`}
        />
        {isUserAdmin && (
          <span className="text-xs text-gray-400">
            Admin users cannot be deleted.
          </span>
        )}
      </div>
    </>
  );
}
