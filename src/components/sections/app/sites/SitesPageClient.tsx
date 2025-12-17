"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import { adminSitesTableColumns } from "@/constants/table/columns/admin-sites-table-columns";
import { userSitesTableColumns } from "@/constants/table/columns/user-sites-table-columns";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { memo, useMemo, useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import SitesTable from "./table/SitesTable";

const EditSiteDialog = dynamic(() => import("./dialogs/EditSiteDialog"), { ssr: false });
const DeleteSiteDialog = dynamic(() => import("./dialogs/DeleteSiteDialog"), { ssr: false });

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

  const handleCloseEdit = useCallback(() => setUpdateSite(undefined), []);
  const handleCloseDelete = useCallback(() => setRemoveSite(undefined), []);

  if (error) return <ErrorCard error={error} />;

  return (
    <>
      <Suspense fallback={null}>
        <EditSiteDialog
          open={!!updateSite}
          siteData={updateSite}
          onClose={handleCloseEdit}
        />
      </Suspense>

      <Suspense fallback={null}>
        <DeleteSiteDialog
          open={!!removeSite}
          siteData={removeSite}
          onClose={handleCloseDelete}
        />
      </Suspense>

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
