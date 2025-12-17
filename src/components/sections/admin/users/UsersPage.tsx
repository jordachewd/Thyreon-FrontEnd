import ErrorCard from "@/components/shared/ErrorCard";
import AllUsersTable from "./table/AllUsersTable";
import { GetUserData } from "@/types/users/get-user-data.d";

type UsersPageProps = {
  users: GetUserData[];
};

export default function UsersPage({ users }: UsersPageProps) {
  const hasUsers = users && users.length > 0;

  if (!hasUsers) return <ErrorCard error="No users found." />;
  return <AllUsersTable data={users} />;
}
