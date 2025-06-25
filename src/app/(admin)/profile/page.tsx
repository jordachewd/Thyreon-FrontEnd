import ProfileBilling from "@/components/sections/ProfileBilling";
import ProfileHero from "@/components/sections/ProfileHero";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { dummyTransactions } from "@/constants/dummy-transactions.const";
import { Transaction } from "@/types/transaction-data.d";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();

  let userTxns: Transaction[] | null = null;

  if (userId) {
    userTxns = dummyTransactions as Transaction[];
  }

  const stripeId = "stripe_123456789989870"; // Example Stripe ID, replace with actual logic to fetch user's Stripe ID

  return (
    <>
      {!userId && <LoadingBubbles wrapped />}
      {userId && (
        <>
          <ProfileHero />
          <ProfileBilling stripeId={stripeId} userTxns={userTxns} />
        </>
      )}
    </>
  );
}
