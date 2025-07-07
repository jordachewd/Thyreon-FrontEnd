import { UserRole } from "./user-role.d";

export interface CreateUserData {
  username: string;
  password: string;
  email: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
}
