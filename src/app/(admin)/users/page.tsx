import AddNewUserDialog from "@/components/sections/admin/users/table/AddNewUserDialog";
import UsersTable from "@/components/sections/admin/users/table/UsersTable";
import PageHead from "@/components/shared/PageHead";

export default function AdminUsers() {
  return (
    <>
      <PageHead title="All Users" alignTitle="left">
        <AddNewUserDialog />
      </PageHead>
      <UsersTable />
    </>
  );
}
