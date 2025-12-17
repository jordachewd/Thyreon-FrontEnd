import PageWrapper from "@/components/layout/common/PageWrapper";
import AccountPage from "@/components/sections/app/account/AccountPage";
import getCurrentUser from "@/lib/actions/users/get-current-user";
import getUserData from "@/lib/actions/users/get-user-data";

export const dynamic = "force-dynamic";

export default async function AppProfile() {
  const user = await getCurrentUser();
  const role = user.success ? user.user.role : "lite";
  const userData = await getUserData();

  return (
    <PageWrapper className="max-w-6xl mx-auto gap-12 my-4">
      <AccountPage
        userInfo={userData.userInfo}
        userTransactions={userData.userTransactions}
        userSites={userData.userSites}
        role={role}
        error={userData.error}
      />
    </PageWrapper>
  );
}
