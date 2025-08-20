import PageWrapper from "@/components/layout/common/PageWrapper";
import AccountPage from "@/components/sections/admin/account/AccountPage";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <PageWrapper className="max-w-6xl mx-auto gap-12 my-4">
      <Suspense fallback={<LoadingBubbles wrapped />}>
        <AccountPage />
      </Suspense>
    </PageWrapper>
  );
}
