"use client";

import SitesTable from "./SitesTable";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { mySitesTableColumns } from "@/constants/table/columns/my-sites-table-columns";
import { useCallback, useState } from "react";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";

export default function MySitesPage() {
  const { data, loading, error } = useQuery(GET_MY_SITES_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const [editSite, setEditSite] = useState<GetSiteData | undefined>(undefined);
  const [deleteSite, setDeleteSite] = useState<GetSiteData | undefined>(
    undefined
  );

  const handleEditSite = useCallback((siteData: GetSiteData) => {
    setEditSite(siteData);
  }, []);

  const handleDeleteSite = useCallback((siteData: GetSiteData) => {
    setDeleteSite(siteData);
  }, []);

  const tableColumns = mySitesTableColumns({
    onEditSite: handleEditSite,
    onDeleteSite: handleDeleteSite,
    onRegenerateApiKey: (siteId: number) => {
      // Handle API key regeneration logic here
      console.log(`MySitesPage: New API Key for site ID: ${siteId}`);
    },
  });

  const sites: GetSiteData[] = data?.meSites || [];

  return (
    <>
      {editSite && (
        <EditSiteDialog
          data={editSite}
          open={editSite !== undefined}
          onClose={() => setEditSite(undefined)}
        />
      )}

      {deleteSite && (
        <DeleteSiteDialog
          data={deleteSite}
          open={deleteSite !== undefined}
          onClose={() => setDeleteSite(undefined)}
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
