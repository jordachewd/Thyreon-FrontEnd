import { create } from "zustand";
import { GetSiteData } from "@/types/sites/get-site-data.d";

type SitesPageStore = {
  newKeyForSite?: Partial<GetSiteData> | undefined;
  setNewKeyForSite: (siteData: Partial<GetSiteData> | undefined) => void;

  update?: Partial<GetSiteData> | undefined;
  setUpdate: (siteData: Partial<GetSiteData> | undefined) => void;

  remove?: Partial<GetSiteData> | undefined;
  setRemove: (siteData: Partial<GetSiteData> | undefined) => void;
};

export const useSitesPageStore = create<SitesPageStore>((set) => ({
  newKeyForSite: undefined,
  update: undefined,
  remove: undefined,
  setNewKeyForSite: (siteId) => set({ newKeyForSite: siteId }),
  setUpdate: (siteData) => set({ update: siteData }),
  setRemove: (siteData) => set({ remove: siteData }),
}));
