import PageWrapper from "@/components/layout/common/PageWrapper";
import UserPage from "@/components/sections/admin/users/UserPage";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminSectionUserPage({ params }: UserPageProps) {
  const { id } = await params;
  return (
    <PageWrapper className="gap-8">
      <UserPage userId={Number(id)} />
    </PageWrapper>
  );
}
