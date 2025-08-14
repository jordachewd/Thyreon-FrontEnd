import PageHead from "@/components/layout/common/PageHead";
import AddUserDialog from "@/components/sections/admin/users/dialogs/AddUserDialog";
import UsersPage from "@/components/sections/admin/users/UsersPage";

export default function AdminUsersPage() {
  return (
    <>
      <PageHead title="Users" alignTitle="left">
        <AddUserDialog />
      </PageHead>
      <UsersPage />
    </>
  );
}
