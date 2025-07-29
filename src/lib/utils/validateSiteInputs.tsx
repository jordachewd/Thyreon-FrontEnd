import { SiteFormErrors } from "@/types/sites/site-form-errors.d";
import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { UpdateSiteData } from "@/types/sites/update-site-data.d";

export function validateSiteInputs(formData: CreateSiteData | UpdateSiteData) {
  const errors: SiteFormErrors = {};

  Object.entries(formData).forEach(([key, value]) => {
    switch (key) {
      case "domain":
        // case "siteName":
        if (typeof value === "string" && (!value || value.trim() === "")) {
          errors[key as keyof SiteFormErrors] = {
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
