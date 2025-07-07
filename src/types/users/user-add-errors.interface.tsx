import { UserFieldError } from "./user-field-error.interface";

export interface NewUserFormErrors {
  firstName?: UserFieldError;
  lastName?: UserFieldError;
  username?: UserFieldError;
  email?: UserFieldError;
  password?: UserFieldError;
}
