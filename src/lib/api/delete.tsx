import { API_URL } from "@/constants/api/public-api-url";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const del = async (path: string, body?: Record<string, unknown>) => {
  const headers = await getClerkAuthHeaders();

  const resp = await fetch(`${API_URL}/${path}`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });

  const respText = await resp.text();
  return respText ? JSON.parse(respText) : null;
};
