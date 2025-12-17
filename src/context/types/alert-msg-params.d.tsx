export type AlertSeverity = "info" | "error" | "success" | "warning";

export interface AlertMessageParams {
  text: string;
  severity: AlertSeverity;
}
