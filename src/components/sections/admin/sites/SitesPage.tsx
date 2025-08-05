"use client";

import SitesTable from "./SitesTable";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";
import ApiKeyDialog from "./dialogs/ApiKeyDialog";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { sitesTableColumns } from "@/constants/table/columns/sites-table-columns";
import { mySitesTableColumns } from "@/constants/table/columns/my-sites-table-columns";
import { useSitesPageStore } from "@/lib/stores/sites/useSitesPageStore";
import { usePathname } from "next/navigation";

export default function SitesPage() {
  const {
    update,
    remove,
    newKeyForSite,
    setNewKeyForSite,
    setUpdate,
    setRemove,
  } = useSitesPageStore();

  const pathname = usePathname();
  const isAllSites = pathname.includes("/allsites");

  const sitesQuery = isAllSites ? GET_SITES_QUERY : GET_MY_SITES_QUERY;
  const { data, loading, error } = useQuery(sitesQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const handleUpdate = useCallback((siteData: Partial<GetSiteData>) => {
    setUpdate(siteData);
  }, []);

  const handleRemove = useCallback((siteData: Partial<GetSiteData>) => {
    setRemove(siteData);
  }, []);

  const handleNewApiKey = useCallback((siteData: Partial<GetSiteData>) => {
    setNewKeyForSite(siteData);
  }, []);

  const getTableColumns = isAllSites ? sitesTableColumns : mySitesTableColumns;
  const tableColumns = getTableColumns({
    onEditSite: handleUpdate,
    onDeleteSite: handleRemove,
    onNewApiKey: handleNewApiKey,
  });

  const dataSites = isAllSites ? data?.sites : data?.meSites;
  const sites: GetSiteData[] = dataSites || [];

  return (
    <>
      {update && (
        <EditSiteDialog
          siteData={update}
          open={update !== undefined}
          onClose={() => setUpdate(undefined)}
        />
      )}

      {remove && (
        <DeleteSiteDialog
          siteData={remove}
          open={remove !== undefined}
          onClose={() => setRemove(undefined)}
        />
      )}

      {newKeyForSite && (
        <ApiKeyDialog
          open={newKeyForSite !== undefined}
          siteData={newKeyForSite}
          onClose={() => setNewKeyForSite(undefined)}
        />
      )}

      <SitesTable
        sites={sites}
        loading={loading}
        error={error}
        tableCols={tableColumns}
      />
    </>
  );
}
