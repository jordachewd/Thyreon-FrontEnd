"use client";

import { USER_ROLE_QUERY } from "@/constants/graphql/users/get-user-role.const";
import { UserRole } from "@/types/users/user-role.d";
import { useQuery } from "@apollo/client/react";

type UserRoleQueryResp = {
  me: { role: UserRole } | undefined;
};

type UserRoleReturn = {
  loading: boolean;
  error: unknown;
  role: UserRole;
  isLite: boolean;
  isPro: boolean;
  isPremium: boolean;
  isAdmin: boolean;
};

export function useUserRole(): UserRoleReturn {
  const { data, loading, error } = useQuery<UserRoleQueryResp>(USER_ROLE_QUERY);
  const role = data?.me?.role ?? ("lite" as UserRole);

  return {
    loading,
    error,
    role,
    isLite: role === "lite",
    isPro: role === "pro",
    isPremium: role === "premium",
    isAdmin: role === "admin",
  };
}
