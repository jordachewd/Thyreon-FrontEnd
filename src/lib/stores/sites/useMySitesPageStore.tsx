import { GetSiteData } from "@/types/sites/get-site-data.d";
import { create } from "zustand";

type MySitesPageStore = {
  newKeyForSite?: number | undefined;
  update?: GetSiteData | undefined;
  remove?: GetSiteData | undefined;
  setNewKeyForSite: (siteId: number | undefined) => void;
  setUpdate: (siteData: GetSiteData | undefined) => void;
  setRemove: (siteData: GetSiteData | undefined) => void;
};

export const useMySitesPageStore = create<MySitesPageStore>((set) => ({
  newKeyForSite: undefined,
  update: undefined,
  remove: undefined,
  setNewKeyForSite: (siteId) => set({ newKeyForSite: siteId }),
  setUpdate: (siteData) => set({ update: siteData }),
  setRemove: (siteData) => set({ remove: siteData }),
}));
