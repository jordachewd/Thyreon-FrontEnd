import PageHead from "@/components/layout/common/PageHead";
import EditUserProfile from "@/components/sections/admin/users/profile/EditUserProfile";

interface UserProfileProps {
  params: Promise<{ id: number }>;
}

export default async function AdminUserProfile({ params }: UserProfileProps) {
  const { id } = (await params) as { id: number };

  return (
    <>
      <PageHead title="Edit User Account" alignTitle="left" />
      <EditUserProfile userId={id} />
    </>
  );
}
