import { AlertMessageParams } from "@/context/types/alert-msg-params.d";
import { create } from "zustand";

type ApiKeyDialogStore = {
  alertMsg: AlertMessageParams | null;
  setAlertMsg: (alertMsg: AlertMessageParams | null) => void;

  newKey?: string;
  setNewKey: (newKey: string | undefined) => void;

  copiedKey?: boolean;
  setCopiedKey: (copiedKey: boolean) => void;

  showCopyWarning?: boolean;
  setShowCopyWarning: (showCopyWarning: boolean) => void;

  resetDialog: () => void;
};

export const useApiKeyDialogStore = create<ApiKeyDialogStore>((set) => ({
  alertMsg: null,
  newKey: undefined,
  copiedKey: false,
  showCopyWarning: false,
  setAlertMsg: (alertMsg: AlertMessageParams | null) => set({ alertMsg }),
  setNewKey: (newKey: string | undefined) => set({ newKey }),
  setCopiedKey: (copiedKey: boolean) => set({ copiedKey }),
  setShowCopyWarning: (showCopyWarning: boolean) => set({ showCopyWarning }),
  resetDialog: () =>
    set({
      alertMsg: null,
      newKey: undefined,
      copiedKey: false,
      showCopyWarning: false,
    }),
}));
