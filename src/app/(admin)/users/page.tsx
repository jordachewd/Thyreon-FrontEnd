import AddNewUserDialog from "@/components/sections/admin/users/table/AddNewUserDialog";
import UsersTable from "@/components/sections/admin/users/table/UsersTable";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import PageHead from "@/components/shared/PageHead";
import getUsers from "@/lib/actions/users/get-users";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function AdminUsers() {
  const users = (await getUsers()) as GetUserData[];

  if (!users) {
    return <LoadingBubbles wrapped />;
  }

  if ("status" in users && "message" in users) {
    return <ErrorCard title="Error!" error={String(users.message)} />;
  }

  return (
    <>
      <PageHead title="All Users" alignTitle="left">
        <AddNewUserDialog />
      </PageHead>
      <UsersTable users={users} />
    </>
  );
}
