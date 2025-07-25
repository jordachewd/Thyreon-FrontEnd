import { AddSiteErrors } from "@/types/sites/add-site-errors.d";
import { CreateSiteData } from "@/types/sites/create-site-data.d";

export function validateSiteInputs(formData: CreateSiteData) {
  const errors: AddSiteErrors = {};

  Object.entries(formData).forEach(([key, value]) => {
    switch (key) {
      case "domain":
        // case "siteName":
        if (typeof value === "string" && (!value || value.trim() === "")) {
          errors[key as keyof AddSiteErrors] = {
            value,
            // info: `${
            //    key === "siteName" ? "Site Name" : "Domain"
            //   } cannot be empty.`,
            info: "Cannot be empty.",
            status: "error",
          };
        }
        break;

      default:
        break;
    }
  });

  return { isValid: Object.keys(errors).length === 0, errors };
}
