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

export default function AllSites() {
  const { data, loading, error } = useQuery(GET_SITES_QUERY);
  const sites = data?.sites || ([] as GetSiteData[]);

  const [editSite, setEditSite] = useState<GetSiteData | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditSite = useCallback((siteData: GetSiteData) => {
    setEditSite(siteData);
    setDialogOpen(true);
  }, []);

  const tableColumns = sitesTableColumns(handleEditSite);

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;
  if (sites.length === 0) return <p>No sites found.</p>;

  return (
    <>
      {editSite && (
        <EditSiteDialog
          data={editSite}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
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
