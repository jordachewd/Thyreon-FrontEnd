import Faqs from "@/components/sections/common/Faqs";
import Plans from "@/components/sections/common/Plans";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import getCurrentUser from "@/lib/actions/users/get-me-user";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function PlansPage() {
  const profile = await getCurrentUser<GetUserData>({ plan: true });

  if (!profile) {
    return <LoadingBubbles wrapped />;
  }

  if ("status" in profile && "message" in profile) {
    return <ErrorCard title="Error!" error={String(profile.message)} />;
  }

  return (
    <>
      <Plans hasLoader currentPlan={profile.currentPlan} />
      <Faqs />
    </>
  );
}
