"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import SitesTable from "./SitesTable";
import { useQuery } from "@apollo/client";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { sitesTableColumns } from "@/constants/table/columns/sites-table-columns";

export default function AllSites() {
  const { data, loading, error } = useQuery(GET_SITES_QUERY);

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  const sites = data?.sites || ([] as GetSiteData[]);

  if (sites.length === 0) return <p>No sites found.</p>;

  return (
    <SitesTable
      sites={sites}
      loading={loading}
      error={error}
      tableCols={sitesTableColumns}
    />
  );
}
