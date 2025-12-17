"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { adminSitesTableColumns } from "@/constants/table/columns/admin-sites-table-columns";
import { userSitesTableColumns } from "@/constants/table/columns/user-sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { memo, useMemo, useState, useCallback } from "react";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import SitesTable from "./table/SitesTable";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { RefetchQueryType } from "@/types/common/refetch-query.d";

type SitesPageClientProps = {
  sites: GetSiteData[];
  isAdminPage: boolean;
  error: string | null;
};

function SitesPageClient({ sites, isAdminPage, error }: SitesPageClientProps) {
  const [updateSite, setUpdateSite] = useState<Partial<GetSiteData> | undefined>(undefined);
  const [removeSite, setRemoveSite] = useState<Partial<GetSiteData> | undefined>(undefined);

  const tableColumns = useMemo(
    () =>
      (isAdminPage ? adminSitesTableColumns : userSitesTableColumns)({
        onEditSite: setUpdateSite,
        onDeleteSite: setRemoveSite,
      }),
    [isAdminPage]
  );

  const refetchQuery: RefetchQueryType = [
    isAdminPage ? GET_SITES_QUERY : GET_MY_SITES_QUERY,
    isAdminPage ? "GetAllSites" : "GetMySites",
  ];

  const handleCloseEdit = useCallback(() => setUpdateSite(undefined), []);
  const handleCloseDelete = useCallback(() => setRemoveSite(undefined), []);

  if (error) return <ErrorCard error={error} />;

  return (
    <>
      <EditSiteDialog
        open={!!updateSite}
        siteData={updateSite}
        onClose={handleCloseEdit}
        refetchQuery={refetchQuery}
      />

      <DeleteSiteDialog
        open={!!removeSite}
        siteData={removeSite}
        onClose={handleCloseDelete}
        refetchQuery={refetchQuery}
      />

      <SitesTable
        sites={sites}
        tableCols={tableColumns}
        isAdmin={isAdminPage}
        loading={false}
      />
    </>
  );
}

export default memo(SitesPageClient);
