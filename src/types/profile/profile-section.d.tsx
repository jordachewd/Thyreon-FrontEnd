import { ApolloError } from "@apollo/client";
import { GetUserData } from "../users/get-user-data.d";

export type ProfileSectionType = {
  data: GetUserData;
  loading: boolean;
  error: ApolloError | undefined;
  title?: string;
  alignTitle?: "left" | "center" | "right";
  titleSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};