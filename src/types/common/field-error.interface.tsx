export interface FieldError {
  value: string | boolean;
  info: string;
  status: "error";
}