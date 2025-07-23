import { CreateUserData } from "@/types/users/create-user-data.d";
import { NewUserFormErrors } from "../../types/users/user-add-errors.interface";
import { UpdateUserData } from "@/types/users/update-user-data.d";

export function validateUserInputs(formData: CreateUserData | UpdateUserData) {
  const errors: NewUserFormErrors = {};

  Object.entries(formData).forEach(([key, value]) => {
    switch (key) {
      case "username":
        if (
          typeof value === "string" &&
          (!value ||
            value.trim() === "" ||
            /\s|-|_/.test(value) ||
            /[^a-z0-9]/.test(value))
        ) {
          errors.username = {
            value,
            info: "Invalid Username: no spaces, uppercase, dashes, underscores, or disallowed characters",
            status: "error",
          };
        }
        break;

      case "firstName":
      case "lastName":
        if (typeof value === "string" && (!value || value.trim() === "")) {
          errors[key as keyof NewUserFormErrors] = {
            value,
            info: `${
              key === "firstName" ? "First" : "Last"
            } Name cannot be empty.`,
            status: "error",
          };
        }
        break;

      case "email":
        if (
          typeof value === "string" &&
          (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        ) {
          errors.email = {
            value,
            info: "Email is invalid.",
            status: "error",
          };
        }
        break;

      case "password":
        if (typeof value === "string" && (!value.trim() || /\s/.test(value))) {
          errors.password = {
            value,
            info: "Password must not be empty or contain spaces.",
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
