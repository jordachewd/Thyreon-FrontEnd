export interface UserFieldError {
  value: string | boolean;
  info: string;
  status: "error";
}