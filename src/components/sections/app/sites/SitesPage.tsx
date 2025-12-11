"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { adminSitesTableColumns } from "@/constants/table/columns/admin-sites-table-columns";
import { userSitesTableColumns } from "@/constants/table/columns/user-sites-table-columns";
import { useSitesData } from "@/lib/hooks/sites/table/useSitesTable";
import { useSitesPageStore } from "@/lib/stores/sites/useSitesPageStore";
import { SitesRoutePrefix } from "@/types/sites/sites-route-prefix.d";
import { memo, useMemo } from "react";
import DeleteSiteDialog from "./dialogs/DeleteSiteDialog";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import SitesTable from "./table/SitesTable";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

type SitesPageProps = {
  isAdminPage?: boolean;
};

function SitesPage({ isAdminPage = false }: SitesPageProps) {
  const { loading, error, refetchQuery, sites } = useSitesData({ isAdminPage });
  const { update, remove, setUpdate, setRemove } = useSitesPageStore();
  const routePrefix: SitesRoutePrefix = isAdminPage ? "admin/sites" : "sites";

  const tableColumns = useMemo(
    () =>
      (isAdminPage ? adminSitesTableColumns : userSitesTableColumns)({
        onEditSite: setUpdate,
        onDeleteSite: setRemove,
        routePrefix,
      }),
    [isAdminPage]
  );

  if (loading) return <LoadingBubbles size="small" />;
  if (error) return <ErrorCard error={error.message} />;

  return (
    <>
      <EditSiteDialog
        open={!!update}
        siteData={update}
        onClose={() => setUpdate(undefined)}
        refetchQuery={refetchQuery}
      />

      <DeleteSiteDialog
        open={!!remove}
        siteData={remove}
        onClose={() => setRemove(undefined)}
        refetchQuery={refetchQuery}
      />

      <SitesTable
        sites={sites}
        tableCols={tableColumns}
        isAdmin={isAdminPage}
        loading={loading}
      />
    </>
  );
}

export default memo(SitesPage);
