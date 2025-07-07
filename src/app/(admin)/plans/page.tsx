import Faqs from "@/components/sections/common/Faqs";
import Plans from "@/components/sections/common/Plans";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { currentUser } from "@clerk/nextjs/server";

export default async function PlansPage() {
  const user = await currentUser();

  if (!user) {
    return <LoadingBubbles wrapped />;
  }

  const userData: GetUserData = {
    id: user.id as unknown as number,
    clerkId: user.id,
    username: user.username || "",
    email: user.emailAddresses[0].emailAddress || "",
    role: user.publicMetadata.role as UserRole,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  return (
    <>
      <Plans userData={userData} hasLoader />
      <Faqs />
    </>
  );
}
