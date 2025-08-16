import { AlertCtxParams } from "../types/alert-ctx-params.d";

export const alertDefaults = {
  message: { text: "", severity: "info" },
  updateAlert: () => {},
} as AlertCtxParams;
