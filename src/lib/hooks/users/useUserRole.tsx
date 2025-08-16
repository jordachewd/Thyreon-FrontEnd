"use client";

import { USER_ROLE_QUERY } from "@/constants/graphql/users/get-user-role.const";
import { UserRole } from "@/types/users/user-role.d";
import { useQuery } from "@apollo/client";

type GetUserRoleResponse = {
  me: { role: UserRole } | null;
};

export function useUserRole() {
  const { data, loading, error } = useQuery<GetUserRoleResponse>(
    USER_ROLE_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const role: UserRole = data?.me?.role ?? "lite";

  return {
    role,
    loading,
    error,
    isLite: role === "lite",
    isPro: role === "pro",
    isPremium: role === "premium",
    isAdmin: role === "admin",
  };
}
