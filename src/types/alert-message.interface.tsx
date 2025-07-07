export interface AlertParams {
  text: string;
  severity?: "info" | "error" | "success" | "warning";
  variant?: "filled" | "outlined";
}
