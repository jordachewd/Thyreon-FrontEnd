import { FormField } from "@/types/common/form-field.d";

export const defaultNewUserFields: FormField[] = [
  {
    label: "Username",
    name: "username",
    type: "text",
    info: "Cannot be empty.",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    info: "Must be a valid email address.",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    info: "Must be at least 8 characters long and contain no spaces.",
    required: true,
  },
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
];
