import EditUserProfile from "@/components/sections/admin/users/profile/EditUserProfile";
import PageHead from "@/components/shared/PageHead";
import { GetUserData } from "@/types/users/get-user-data.d";
import getUserById from "@/lib/actions/users/get-user-by-id";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";

interface UserProfileProps {
  params: Promise<{ id: number }>;
}

export default async function AdminUserProfile({ params }: UserProfileProps) {
  const { id } = (await params) as { id: number };
  const user = await getUserById<GetUserData>(id);

  if (!user) {
    return <LoadingBubbles wrapped />;
  }

  if ("status" in user && "message" in user) {
    return (
      <ErrorCard
        title="Error!"
        error={String(user.message)}
        backToUrl="users"
      />
    );
  }

  return (
    <>
      <PageHead title="Edit User Account" alignTitle="left" />
      <EditUserProfile userData={user} />
    </>
  );
}
