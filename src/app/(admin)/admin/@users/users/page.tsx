import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import AddUserDialog from "@/components/sections/admin/users/dialogs/AddUserDialog";
import UsersPage from "@/components/sections/admin/users/UsersPage";

export default function AdminSectionUsersPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="All Users" alignTitle="left">
        <AddUserDialog />
      </PageHead>
      <UsersPage />
    </PageWrapper>
  );
}
