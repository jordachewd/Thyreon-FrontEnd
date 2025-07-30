"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import SitesTable from "./SitesTable";
import { useQuery } from "@apollo/client";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { sitesTableColumns } from "@/constants/table/columns/sites-table-columns";
import { useCallback, useState } from "react";
import EditSiteDialog from "./EditSiteDialog";
import Typography from "@mui/material/Typography";
import DeleteSiteDialog from "./DeleteSiteDialog";

export default function AllSites() {
  const { data, loading, error } = useQuery(GET_SITES_QUERY);
  const sites = data?.sites || ([] as GetSiteData[]);

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

  const tableColumns = sitesTableColumns({
    onEditSite: handleEditSite,
    onDeleteSite: handleDeleteSite,
  });

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  if (sites.length === 0)
    return (
      <Typography variant="body2" color="textSecondary">
        No registered sites yet.
      </Typography>
    );

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
        loading={loading}
        error={error}
        tableCols={tableColumns}
      />
    </>
  );
}
