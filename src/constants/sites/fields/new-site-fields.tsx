import { FormField } from "@/types/common/form-field.d";

export const defaultNewSiteFields: FormField[] = [
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
    info: "The name of the site as it will appear in the dashboard.",
  },
];
