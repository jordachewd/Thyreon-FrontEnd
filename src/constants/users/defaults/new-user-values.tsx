import { CreateUserData } from "@/types/users/create-user-data.d";
import { UserRole } from "@/types/users/user-role.d";

export const defaultNewUserValues: CreateUserData = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "lite" as UserRole,
};
