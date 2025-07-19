import { GetUserData } from "@/types/users/get-user-data.d";
import { ApolloError } from "@apollo/client";

export interface MeCtxParams {
  data: { me: GetUserData | undefined };
  loading: boolean;
  error: ApolloError | undefined;
}
