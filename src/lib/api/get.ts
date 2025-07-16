import { API_URL } from "@/constants/api/public-api-url";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
) => {
  const headers = await getClerkAuthHeaders();
  const searchParams = params ? `?${params.toString()}` : "";

  const resp = await fetch(`${API_URL}/${path}${searchParams}`, {
    method: "GET",
    headers: headers,
    next: { tags },
  });

  const response = (await resp.json()) as T;
  return response;
};
