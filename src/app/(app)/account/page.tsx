import PageWrapper from "@/components/layout/common/PageWrapper";
import AccountPage from "@/components/sections/app/account/AccountPage";

export default function AppProfile() {
  return (
    <PageWrapper className="max-w-6xl mx-auto gap-12 my-4">
      <AccountPage />
    </PageWrapper>
  );
}
