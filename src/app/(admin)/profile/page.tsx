import ProfileBilling from "@/components/sections/admin/ProfileBilling";
import ProfileHero from "@/components/sections/admin/ProfileHero";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import getCurrentUser from "@/lib/actions/users/get-me-user";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function ProfilePage() {
  const profile = await getCurrentUser<GetUserData>({
    transactions: true,
    plan: true,
  });

  if (!profile) {
    return <LoadingBubbles wrapped />;
  }

  if ("status" in profile && "message" in profile) {
    return <ErrorCard title="Error!" error={String(profile.message)} />;
  }

  return (
    <>
      <ProfileHero profile={profile} />
      <ProfileBilling
        currentPlan={profile.plan}
        transactions={profile.transactions}
      />
    </>
  );
}
