"use client";

import SitesTable from "./SitesTable";
import { useQuery } from "@apollo/client";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { sitesTableColumns } from "@/constants/table/columns/sites-table-columns";
import { useCallback, useState } from "react";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";

export default function AllSitesPage() {
  const { data, loading, error } = useQuery(GET_SITES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const [update, setUpdate] = useState<GetSiteData | undefined>(undefined);
  const [remove, setRemove] = useState<GetSiteData | undefined>(undefined);

  const handleUpdate = useCallback((siteData: GetSiteData) => {
    setUpdate(siteData);
  }, []);

  const handleRemove = useCallback((siteData: GetSiteData) => {
    setRemove(siteData);
  }, []);

  const tableColumns = sitesTableColumns({
    onEditSite: handleUpdate,
    onDeleteSite: handleRemove,
    onRegenerateApiKey: (siteId: number) => {
      // Handle API key regeneration logic here
      console.log(`AllSitesPage: New API Key for site ID: ${siteId}`);
    },
  });

  const sites: GetSiteData[] = data?.sites || [];

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

      <SitesTable
        sites={sites}
        loading={loading}
        error={error}
        tableCols={tableColumns}
      />
    </>
  );
}
