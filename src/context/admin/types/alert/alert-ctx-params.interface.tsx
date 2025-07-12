import { AlertMessageParams } from "./alert-msg-params.interface";

export interface AlertCtxParams {
  message: AlertMessageParams;
  updateAlert: (newAlert: AlertMessageParams) => void;
}
