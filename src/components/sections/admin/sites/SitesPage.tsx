"use client";

import SitesTable from "./table/SitesTable";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { sitesTableColumns } from "@/constants/table/columns/sites-table-columns";
import { mySitesTableColumns } from "@/constants/table/columns/my-sites-table-columns";
import { useSitesPageStore } from "@/lib/stores/sites/useSitesPageStore";
import { usePathname } from "next/navigation";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import ErrorCard from "@/components/shared/ErrorCard";

export default function SitesPage() {
  const { update, remove, setUpdate, setRemove } = useSitesPageStore();

  const pathname = usePathname();
  const isAllSites = pathname.includes("/allsites");

  const sitesQuery = isAllSites ? GET_SITES_QUERY : GET_MY_SITES_QUERY;
  const { data, loading, error } = useQuery(sitesQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const sites = (isAllSites ? data?.sites : data?.meSites) ?? [];

  console.log("Sites data:", sites);

  const tableColumns = useMemo(
    () =>
      (isAllSites ? sitesTableColumns : mySitesTableColumns)({
        onEditSite: setUpdate,
        onDeleteSite: setRemove,
        routePrefix: isAllSites ? "allsites" : "mysites",
      }),
    [isAllSites]
  );

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  return (
    <>
      <EditSiteDialog
        open={!!update}
        siteData={update}
        onClose={() => setUpdate(undefined)}
        refetchQuery={[sitesQuery, isAllSites ? "GetAllSites" : "GetMySites"]}
      />

      <DeleteSiteDialog
        open={!!remove}
        siteData={remove}
        onClose={() => setRemove(undefined)}
        refetchQuery={[sitesQuery, isAllSites ? "GetAllSites" : "GetMySites"]}
      />

      <SitesTable
        sites={sites}
        tableCols={tableColumns}
        isAllSites={isAllSites}
      />
    </>
  );
}
