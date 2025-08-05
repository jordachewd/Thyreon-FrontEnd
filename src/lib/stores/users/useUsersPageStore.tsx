import { GetUserData } from "@/types/users/get-user-data.d";
import { create } from "zustand";

type UsersPageStore = {
  update?: GetUserData | undefined;
  setUpdate: (siteData: GetUserData | undefined) => void;

  remove?: GetUserData | undefined;
  setRemove: (siteData: GetUserData | undefined) => void;
};

export const useUsersPageStore = create<UsersPageStore>((set) => ({
  update: undefined,
  remove: undefined,
  setUpdate: (userData) => set({ update: userData }),
  setRemove: (userData) => set({ remove: userData }),
}));
