import PageHead from "@/components/layout/common/PageHead";
import AddUserDialog from "@/components/sections/admin/users/dialogs/AddUserDialog";
import UsersTable from "@/components/sections/admin/users/table/UsersTable";

export default function AdminUsers() {
  return (
    <>
      <PageHead title="All Users" alignTitle="left">
        <AddUserDialog />
      </PageHead>
      <UsersTable />
    </>
  );
}
