import { FieldError } from "../common/field-error.interface";

export interface SiteFormErrors {
  domain?: FieldError;
  siteName?: FieldError;
}
