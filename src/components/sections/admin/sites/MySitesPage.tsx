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
import { useMySitesPageStore } from "@/lib/stores/sites/useMySitesPageStore";

export default function MySitesPage() {
  const {
    update,
    remove,
    newKeyForSite,
    setNewKeyForSite,
    setUpdate,
    setRemove,
  } = useMySitesPageStore();

  const { data, loading, error } = useQuery(GET_MY_SITES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const handleEditSite = useCallback((siteData: GetSiteData) => {
    setUpdate(siteData);
  }, []);

  const handleDeleteSite = useCallback((siteData: GetSiteData) => {
    setRemove(siteData);
  }, []);

  const handleNewApiKey = useCallback((siteId: number) => {
    setNewKeyForSite(siteId);
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
          data={update}
          open={update !== undefined}
          onClose={() => setUpdate(undefined)}
        />
      )}

      {remove && (
        <DeleteSiteDialog
          data={remove}
          open={remove !== undefined}
          onClose={() => setRemove(undefined)}
        />
      )}

      {newKeyForSite && (
        <ApiKeyDialog
          open={newKeyForSite !== undefined}
          siteId={newKeyForSite}
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
