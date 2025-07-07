import { UserRole } from "@/types/users/user-role.d";
import { userRolesValues } from "../defaults/user-role-values";
import { EditUserField } from "@/types/users/edit-user-field.interface";

export const defaultEditUserFields: EditUserField[] = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    info: "Cannot be empty.",
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    info: "Cannot be empty.",
    required: true,
  },
  {
    label: "Username",
    name: "username",
    type: "text",
    info: "Usernames cannot be changed. Changes can only be made in via Clerk.",
    required: true,
    disabled: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    info: "Email cannot be changed. Changes can only be made in via Clerk.",
    required: true,
    disabled: true,
  },
  {
    label: "Role (Plan)",
    name: "role",
    type: "select",
    info: "Only admins can change user roles.",
    options: userRolesValues as UserRole[],
    required: true,
  },
];
