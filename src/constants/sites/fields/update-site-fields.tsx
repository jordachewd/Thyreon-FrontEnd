import { FormField } from "@/types/common/form-field.d";

export const defaultUpdateSiteFields: FormField[] = [
  {
    label: "Domain",
    name: "domain",
    type: "text",
    info: "Domain cannot be changed after creation.",
    required: true,
    disabled: true,
  },
  {
    label: "Site Name",
    name: "siteName",
    type: "text",
    info: "The name of the site as it will appear in the dashboard.",
  },
];
