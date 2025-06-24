import Faqs from "@/components/sections/Faqs";
import Plans from "@/components/sections/Plans";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { dummyUser } from "@/constants/dummy-user.const";
import { UserData } from "@/types/user-data.d";
import { auth } from "@clerk/nextjs/server";

export default async function PlansPage() {
  const { userId } = await auth();
  let userData: UserData | null = null;

  if (userId) {
    userData = dummyUser as UserData; 
  }

  return (
    <>
      {userData ? (
        <>
          <Plans userData={userData} hasLoader />
          <Faqs />
        </>
      ) : (
        <div className="flex justify-center items-center h-dvh">
          <LoadingBubbles />
        </div>
      )}
    </>
  );
}
