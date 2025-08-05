"use client";

import SitesTable from "./SitesTable";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";
import ApiKeyDialog from "./dialogs/ApiKeyDialog";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { sitesTableColumns } from "@/constants/table/columns/sites-table-columns";
import { useSitesPageStore } from "@/lib/stores/sites/useSitesPageStore";

export default function AllSitesPage() {
  const {
    update,
    remove,
    newKeyForSite,
    setNewKeyForSite,
    setUpdate,
    setRemove,
  } = useSitesPageStore();

  const { data, loading, error } = useQuery(GET_SITES_QUERY, {
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

  const tableColumns = sitesTableColumns({
    onEditSite: handleUpdate,
    onDeleteSite: handleRemove,
    onNewApiKey: handleNewApiKey,
  });

  const sites: GetSiteData[] = data?.sites || [];

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
