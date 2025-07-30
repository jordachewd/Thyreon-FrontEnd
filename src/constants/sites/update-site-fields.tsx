import { FormField } from "@/types/common/form-field.interface";

export const defaultUpdateSiteFields: FormField[] = [
  {
    label: "Domain",
    name: "domain",
    type: "text",
    info: "Must be a valid domain URL.",
    required: true,
  },
  {
    label: "Site Name",
    name: "siteName",
    type: "text",
    info: "The name of the site as it will appear in the dashboard.",
  },
  {
    label: "API Key",
    name: "apiKey",
    type: "text",
    info: "The API key for the site, used for authentication.",
    required: true,
  },
];
