import { ErrorField } from "../fields/field-error.interface";

export interface UpdateUserErrors {
  firstName?: ErrorField;
  lastName?: ErrorField;
  username?: ErrorField;
  email?: ErrorField;
  userImg?: ErrorField;
  coverImg?: ErrorField;
  role?: ErrorField;
  fileSize?: ErrorField;
  bio?: ErrorField;
  activePlan?: ErrorField;
}
