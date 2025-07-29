"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import SitesTable from "./SitesTable";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { mySitesTableColumns } from "@/constants/table/columns/my-sites-table-columns";
import { useCallback, useState } from "react";
import EditSiteDialog from "./EditSiteDialog";

export default function MySites() {
  const { data, loading, error } = useQuery(GET_MY_SITES_QUERY);
  const sites = data?.meSites || ([] as GetSiteData[]);

  const [editSite, setEditSite] = useState<GetSiteData | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEditSite = useCallback((siteData: GetSiteData) => {
    setEditSite(siteData);
    setDialogOpen(true);
  }, []);

  const tableColumns = mySitesTableColumns(handleEditSite);

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
