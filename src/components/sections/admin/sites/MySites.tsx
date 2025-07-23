"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-sites.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";

export default function MySites() {
  const { data, loading, error } = useQuery(GET_SITES_QUERY);

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  const sites = data?.sites || [];

  if (sites.length === 0) return <p>No sites found.</p>;

  return (
    <ul>
      {sites.map((site: GetSiteData) => (
        <li key={site.id} className="flex flex-col gap-2 !mb-4 border-b !pb-4">
          <p>
            <b>Domain:</b> {site.domain}
          </p>
          <p>
            <b>Name:</b> {site.siteName}
          </p>
          <p>
            <b>API Key:</b> {site.apiKey}
          </p>
        </li>
      ))}
    </ul>
  );
}
