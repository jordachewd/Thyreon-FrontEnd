import AddNewUserDialog from "@/components/sections/admin/users/table/AddNewUserDialog";
import UsersTable from "@/components/sections/admin/users/table/UsersTable";
import PageHead from "@/components/shared/PageHead";
import getUsers from "@/lib/actions/users/get-users";
import { GetUserData } from "@/types/users/get-user-data.d";
import { UserRole } from "@/types/users/user-role.d";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const users = (await getUsers()) as GetUserData[];
  const authUser = (await currentUser()) as User;
  const isAdmin = authUser?.publicMetadata.role === ("admin" as UserRole);

  if (!isAdmin) {
    redirect("/401");
  }

  if (!users) return <p>No users found.</p>;

  return (
    <>
      <PageHead title="All Users" alignTitle="left">
        <AddNewUserDialog />
      </PageHead>
      <UsersTable users={users} />
    </>
  );
}
