import PageHead from "@/components/layout/common/PageHead";
import AddUserDialog from "@/components/sections/admin/users/dialogs/AddUserDialog";
import AllUsersPage from "@/components/sections/admin/users/UsersPage";

export default function AdminUsers() {
  return (
    <>
      <PageHead title="All Users" alignTitle="left">
        <AddUserDialog />
      </PageHead>

      <AllUsersPage />
    </>
  );
}
