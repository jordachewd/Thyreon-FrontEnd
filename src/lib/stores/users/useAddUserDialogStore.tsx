import { defaultNewUserValues as defaultVals } from "@/constants/users/defaults/new-user-values";
import { CreateUserData } from "@/types/users/create-user-data.d";
import { create } from "zustand";

type AddUserDialogStore = {
  open: boolean;
  formData: CreateUserData;
  openDialog: () => void;
  closeDialog: () => void;
  setField: (field: keyof CreateUserData, value: string) => void;
};

export const useAddUserDialogStore = create<AddUserDialogStore>((set) => ({
  open: false,
  formData: defaultVals,
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
  setField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
}));
