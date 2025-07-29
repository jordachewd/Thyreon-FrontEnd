import { FormField } from "@/types/common/form-field.interface";

export const defaultEditUserFields: FormField[] = [
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
    info: "Changes only via Clerk.",
    required: true,
    disabled: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    info: "Changes only via Clerk.",
    required: true,
    disabled: true,
  },
];
