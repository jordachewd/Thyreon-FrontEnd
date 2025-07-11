import ProfileBilling from "@/components/sections/admin/ProfileBilling";
import ProfileHero from "@/components/sections/admin/ProfileHero";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import getCurrentUser from "@/lib/actions/users/get-current-user";
// import getUserTransactions from "@/lib/actions/users/get-user-transactions";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function ProfilePage() {
  const profile = (await getCurrentUser()) as GetUserData;

  if (!profile) {
    return <LoadingBubbles wrapped />;
  }

  if ("status" in profile && "message" in profile) {
    return <ErrorCard title="Error!" error={String(profile.message)} />;
  }

/*   const userTransactions = await getUserTransactions(
    "user_2zgGC5RTwi6Fh1btC9u2woTZSBE"
  );

  console.log("User Transactions:", userTransactions); */

  return (
    <>
      <ProfileHero profile={profile} />
      <ProfileBilling profile={profile} />
    </>
  );
}
