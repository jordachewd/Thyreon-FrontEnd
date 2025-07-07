import EditUserProfile from "@/components/sections/admin/users/profile/EditUserProfile";
import PageHead from "@/components/shared/PageHead";
import Typography from "@mui/material/Typography";
import { currentUser, User } from "@clerk/nextjs/server";
import { GetUserData } from "@/types/users/get-user-data.d";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/users/user-role.d";
import getUserById from "@/lib/actions/users/get-user-by-id";

interface UserProfileProps {
  params: Promise<{ id: number }>;
}

export default async function AdminUserProfile({ params }: UserProfileProps) {
  const { id } = (await params) as { id: number };
  const user = await getUserById<GetUserData>(id);

  const authUser = (await currentUser()) as User;
  const isAuthAdmin = authUser?.publicMetadata.role === ("admin" as UserRole);

  if (!isAuthAdmin) {
    redirect("/401");
  }

  if (!user.id) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <>
      <PageHead title="Edit User Account" alignTitle="left" />
      <EditUserProfile userData={user} />
    </>
  );
}
