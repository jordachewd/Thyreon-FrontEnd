import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import AddUserDialog from "@/components/sections/admin/users/dialogs/AddUserDialog";
import UsersPage from "@/components/sections/admin/users/UsersPage";
import getAllUsers from "@/lib/actions/users/get-all-users";

export const dynamic = "force-dynamic"; // Ensure the page is always server-side rendered

export default async function AppUsers() {
  const users = await getAllUsers();

  return (
    <PageWrapper className="gap-8">
      <PageHead title="All Users" alignTitle="left">
        <AddUserDialog />
      </PageHead>

      <UsersPage users={users.success ? users.users : []} />
    </PageWrapper>
  );
}
