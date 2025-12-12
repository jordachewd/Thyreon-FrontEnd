import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import AddSiteDialog from "@/components/sections/app/sites/dialogs/AddSiteDialog";
import SitesPage from "@/components/sections/app/sites/SitesPage";
import getCurrentUser from "@/lib/actions/users/get-current-user";
import { UserRole } from "@/types/users/user-role.d";

export const dynamic = "force-dynamic"; // Ensure the page is always server-side rendered

export default async function AppSites() {
  const user = await getCurrentUser();
  const role: UserRole = user.success ? user.user.role : "lite";

  return (
    <PageWrapper className="gap-8">
      <PageHead title="Websites" alignTitle="left">
        <AddSiteDialog />
      </PageHead>

      <SitesPage isAdminPage={role === "admin"} />
    </PageWrapper>
  );
}

