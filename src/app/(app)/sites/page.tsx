import { Suspense } from "react";
import nextDynamic from "next/dynamic";
import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import SitesPageClient from "@/components/sections/app/sites/SitesPageClient";
import getCurrentUser from "@/lib/actions/users/get-current-user";
import { getAllSites, getMySites } from "@/lib/actions/sites/get-sites";
import { UserRole } from "@/types/users/user-role.d";

const AddSiteDialog = nextDynamic(
  () => import("@/components/sections/app/sites/dialogs/AddSiteDialog")
);

export const dynamic = "force-dynamic";

export default async function AppSites() {
  const user = await getCurrentUser();
  const role: UserRole = user.success ? user.user.role : "lite";
  const isAdmin = role === "admin";

  // Fetch sites on server based on role
  const sitesResult = isAdmin ? await getAllSites() : await getMySites();
  const sites = sitesResult.success ? sitesResult.sites : [];

  return (
    <PageWrapper className="gap-8">
      <PageHead title="Websites" alignTitle="left">
        <Suspense fallback={null}>
          <AddSiteDialog />
        </Suspense>
      </PageHead>

      <SitesPageClient 
        sites={sites} 
        isAdminPage={isAdmin} 
        error={sitesResult.success ? null : sitesResult.error}
      />
    </PageWrapper>
  );
}
