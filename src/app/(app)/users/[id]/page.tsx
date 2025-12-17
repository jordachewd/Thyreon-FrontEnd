import PageWrapper from "@/components/layout/common/PageWrapper";
import UserPage from "@/components/sections/admin/users/UserPage";
import getCurrentUser from "@/lib/actions/users/get-current-user";
import getUserById from "@/lib/actions/users/get-user-by-id";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminSectionUserPage({ params }: UserPageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  const role = user.success ? user.user.role : "lite";
  const userData = await getUserById(Number(id));
  
  return (
    <PageWrapper className="gap-8">
      <UserPage
        userInfo={userData.userInfo}
        userTransactions={userData.userTransactions}
        userSites={userData.userSites}
        role={role}
        error={userData.error}
      />
    </PageWrapper>
  );
}
