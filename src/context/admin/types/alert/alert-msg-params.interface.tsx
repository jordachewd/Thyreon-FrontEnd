export interface AlertMessageParams {
  text: string;
  severity?: "info" | "error" | "success" | "warning";
  variant?: "filled" | "outlined";
}
