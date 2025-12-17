import { UserRole } from "./user-role.d";

export interface CreateUserData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}
