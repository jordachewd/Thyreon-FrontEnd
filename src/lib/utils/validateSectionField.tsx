import { ErrorField } from "@/types/fields/field-error.interface";
import { capitalizeFirstLetter } from "./capitalize-first-letter";

export function validateSectionField<T>(formData: T): {
  isValid: boolean;
  errors: Partial<Record<keyof T, ErrorField>>;
} {
  const errors: Partial<Record<keyof T, ErrorField>> = {};

  for (const key in formData) {
    const value = formData[key];

    const isFileField = key === "userImg" || key === "coverImg";

    if (isFileField) {
      if (typeof value === "string" && value.trim() !== "") {
        const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        const extension = value.split(".").pop()?.toLowerCase();
        const maxFileSize = 1 * 1024 * 1024; // 1MB

        const fileSize =
          ((formData as Record<string, unknown>)["fileSize"] as
            | number
            | undefined) || 0;

        if (!extension || !validExtensions.includes(extension)) {
          errors[key as keyof T] = {
            value,
            info: `Invalid image format. Accepted formats: ${validExtensions.join(
              ", "
            )}.`,
            status: "error",
          };
        } else if (fileSize > maxFileSize) {
          errors[key as keyof T] = {
            value,
            info: `File size exceeds 1MB. Please upload a smaller file.`,
            status: "error",
          };
        }
      }
      continue;
    }

    if (!isNaN(Number(value)) && Number(value) <= 0) {
      errors[key as keyof T] = {
        value,
        info: `${capitalizeFirstLetter(key)} must be a valid positive number.`,
        status: "error",
      };
    } else if (
      typeof value === "string" &&
      (value.trim() === "" || value.length < 3)
    ) {
      errors[key as keyof T] = {
        value,
        info: `${capitalizeFirstLetter(
          key
        )} must be a non-empty string with at least 3 characters.`,
        status: "error",
      };
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
