import EditUserProfile from "@/components/sections/admin/users/EditUserPage";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserProfile({ params }: UserProfileProps) {
  const { id } = await params;
  return <EditUserProfile userId={Number(id)} />;
}
