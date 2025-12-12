import { auth } from "@clerk/nextjs/server";

export const getClerkAuthHeaders = async (isFormData: boolean = false) => {
  const { getToken } = await auth();
  const token = await getToken();

  const headers: Record<string, string | undefined> = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  if (!isFormData) {
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
  }

  const filteredHeaders = Object.fromEntries(
    Object.entries(headers).filter(([, v]) => v !== undefined) as [
      string,
      string
    ][]
  );

  return filteredHeaders;
};
