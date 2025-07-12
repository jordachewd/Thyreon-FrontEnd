import { AlertCtxParams } from "../types/alert/alert-ctx-params.interface";

export const alertDefaults = {
  message: { text: "", severity: "info", variant: "filled" },
  updateAlert: () => {},
} as AlertCtxParams;
