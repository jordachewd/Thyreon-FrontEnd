import { FormField } from "@/types/common/form-field.interface";

export const defaultUpdateSiteFields: FormField[] = [
  {
    label: "Domain",
    name: "domain",
    type: "text",
    info: "Must be a valid domain name.",
    required: true,
  },
  {
    label: "Site Name",
    name: "siteName",
    type: "text",
    // info: "Cannot be empty.",
    // required: true,
  },
];
