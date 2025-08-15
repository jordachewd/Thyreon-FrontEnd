import PageWrapper from "@/components/layout/common/PageWrapper";
import EditUserProfile from "@/components/sections/admin/users/EditUserPage";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function AdminSectionUserPage({
  params,
}: UserProfileProps) {
  const { id } = await params;
  return (
    <PageWrapper className="gap-8">
      <EditUserProfile userId={Number(id)} />
    </PageWrapper>
  );
}
