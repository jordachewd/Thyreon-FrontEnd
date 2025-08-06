import { create } from "zustand";
import { GetSiteData } from "@/types/sites/get-site-data.d";

type SitesPageStore = {
  update?: Partial<GetSiteData> | undefined;
  setUpdate: (siteData: Partial<GetSiteData> | undefined) => void;

  remove?: Partial<GetSiteData> | undefined;
  setRemove: (siteData: Partial<GetSiteData> | undefined) => void;
};

export const useSitesPageStore = create<SitesPageStore>((set) => ({
  update: undefined,
  remove: undefined,
  setUpdate: (siteData) => set({ update: siteData }),
  setRemove: (siteData) => set({ remove: siteData }),
}));
