import { auth } from "@clerk/nextjs/server";

export const getClerkAuthHeaders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const headers: Record<string, string | undefined> = {
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  };

  const filteredHeaders = Object.fromEntries(
    Object.entries(headers).filter(([, v]) => v !== undefined) as [
      string,
      string
    ][]
  );

  if (!token) {
    console.warn(
      "No Clerk session token found on server-side request. Request will be unauthenticated."
    );
  }

  return filteredHeaders;
};
