import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { dummyUser } from "@/constants/dummy-user.const";
import { auth } from "@clerk/nextjs/server";

export default async function PlansPage() {
  const { userId } = await auth();

  return (
    <>
      {!userId && <LoadingBubbles wrapped />}
      {userId && (
        <>
          <Plans userData={dummyUser} hasLoader />
          <Faqs />
        </>
      )}
    </>
  );
}
