import { defaultUpdateSiteValues as defaultVals } from "@/constants/sites/update-site-values";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { create } from "zustand";

type EditSiteDialogStore = {
  formData: Partial<GetSiteData>;
  resetDialog: () => void;
  setField: (name: keyof Partial<GetSiteData>, value: string) => void;
  setFormData: (data: Partial<GetSiteData>) => void;
};

export const useEditSiteDialogStore = create<EditSiteDialogStore>((set) => ({
  formData: defaultVals,
  resetDialog: () =>
    set({
      formData: defaultVals,
    }),
  setField: (name, value) =>
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    })),
  setFormData: (data) => set({ formData: data }),
}));
