import { AlertMessageParams } from "./alert-msg-params.d";

export interface AlertCtxParams {
  message: AlertMessageParams;
  updateAlert: (newAlert: AlertMessageParams) => void;
}
