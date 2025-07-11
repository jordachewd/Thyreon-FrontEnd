import { ErrorField } from "@/types/fields/field-error.interface";
import { capitalizeFirstLetter } from "./capitalize-first-letter";

export function validateSectionField<T>(formData: T): {
  isValid: boolean;
  errors: Partial<Record<keyof T, ErrorField>>;
} {
  const errors: Partial<Record<keyof T, ErrorField>> = {};

  for (const key in formData) {
    const value = formData[key];

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
