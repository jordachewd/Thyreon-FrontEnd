import { FieldError } from "../common/field-error.interface";

export interface AddSiteErrors {
  domain?: FieldError;
  siteName?: FieldError;
}
