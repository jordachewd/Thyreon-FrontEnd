import { FieldError } from "../common/field-error.interface";

export interface NewUserFormErrors {
  firstName?: FieldError;
  lastName?: FieldError;
  username?: FieldError;
  email?: FieldError;
  password?: FieldError;
}
