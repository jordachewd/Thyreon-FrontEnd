import { defaultEditUserValues as defaultVals } from "@/constants/users/defaults/edit-user-values";
import { GetUserData } from "@/types/users/get-user-data.d";
import { create } from "zustand";

type EditUserDialogStore = {
  open: boolean;
  formData: Partial<GetUserData>;
  openDialog: () => void;
  closeDialog: () => void;
  setField: (name: keyof Partial<GetUserData>, value: string) => void;
  setFormData: (data: Partial<GetUserData>) => void;
};

export const useEditUserDialogStore = create<EditUserDialogStore>((set) => ({
  formData: defaultVals,
  open: false,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
  setField: (name, value) =>
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    })),
  setFormData: (data) => set({ formData: data }),
}));
