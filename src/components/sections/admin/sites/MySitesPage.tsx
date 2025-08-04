"use client";

import SitesTable from "./SitesTable";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { mySitesTableColumns } from "@/constants/table/columns/my-sites-table-columns";
import { useCallback } from "react";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";
import ApiKeyDialog from "./dialogs/ApiKeyDialog";
import { useSitesPageStore } from "@/lib/stores/sites/useMySitesPageStore";

export default function MySitesPage() {
  const {
    update,
    remove,
    newKeyForSite,
    setNewKeyForSite,
    setUpdate,
    setRemove,
  } = useSitesPageStore();

  const { data, loading, error } = useQuery(GET_MY_SITES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const handleEditSite = useCallback((siteData: Partial<GetSiteData>) => {
    setUpdate(siteData);
  }, []);

  const handleDeleteSite = useCallback((siteData: Partial<GetSiteData>) => {
    setRemove(siteData);
  }, []);

  const handleNewApiKey = useCallback((siteData: Partial<GetSiteData>) => {
    setNewKeyForSite(siteData);
  }, []);

  const tableColumns = mySitesTableColumns({
    onEditSite: handleEditSite,
    onDeleteSite: handleDeleteSite,
    onNewApiKey: handleNewApiKey,
  });

  const sites: GetSiteData[] = data?.meSites || [];

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
        tableCols={tableColumns}
        loading={loading}
        error={error}
      />
    </>
  );
}
