import { GetUserData } from "./get-user-data.d";

export type GetUserInfo = Omit<GetUserData, "transactions" | "sites">;
