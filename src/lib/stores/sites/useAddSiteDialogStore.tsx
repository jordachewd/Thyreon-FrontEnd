import { create } from "zustand";
import { CreateSiteData } from "@/types/sites/create-site-data.d";
import { defaultNewSiteValues as defaultVals } from "@/constants/sites/defaults/new-site-values";
import { AlertMessageParams } from "@/context/admin/types/alert/alert-msg-params.interface";

type AddSiteDialogStore = {
  open: boolean;
  formData: CreateSiteData;
  siteKey?: string;
  copiedKey: boolean;
  showCopyWarning: boolean;
  alertMsg: AlertMessageParams | null;
  openDialog: () => void;
  closeDialog: () => void;
  resetDialog: () => void;
  setField: (name: keyof CreateSiteData, value: string) => void;
  setSiteKey: (key: string) => void;
  setCopiedKey: (val: boolean) => void;
  setShowCopyWarning: (val: boolean) => void;
  setAlertMsg: (alertMsg: AlertMessageParams | null) => void;
};

export const useAddSiteDialogStore = create<AddSiteDialogStore>((set) => ({
  open: false,
  formData: defaultVals,
  siteKey: undefined,
  copiedKey: false,
  showCopyWarning: false,
  alertMsg: null,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
  resetDialog: () =>
    set({
      formData: defaultVals,
      siteKey: undefined,
      copiedKey: false,
      showCopyWarning: false,
      alertMsg: null,
    }),
  setField: (name, value) =>
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    })),
  setSiteKey: (key) => set({ siteKey: key }),
  setCopiedKey: (val) => set({ copiedKey: val }),
  setShowCopyWarning: (val) => set({ showCopyWarning: val }),
  setAlertMsg: (alertMsg: AlertMessageParams | null) => set({ alertMsg }),
}));
