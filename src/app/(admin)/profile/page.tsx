import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { dummyUser } from "@/constants/dummy-user.const";
import { Transaction } from "@/types/transaction-data.d";
import { UserData } from "@/types/user-data.d";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();
  let userData: UserData | null = null;
  let userTxns: Transaction[] | null = null;

  if (userId) {
    userData = dummyUser as UserData;
    userTxns = [];
  }

  const stripeId = userData?.plan?.stripeId || null;

  return (
    <>
      {userData ? (
        <>
          <ProfileHero userData={userData} />
          <ProfileBilling stripeId={stripeId} userTxns={userTxns} />
        </>
      ) : (
        <div className="flex justify-center items-center h-dvh">
          <LoadingBubbles />
        </div>
      )}
    </>
  );
}
