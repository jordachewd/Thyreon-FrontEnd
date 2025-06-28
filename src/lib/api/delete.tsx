import { API_URL } from "@/constants/public-api-url";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const del = async (path: string, body?: Record<string, unknown>) => {
  const headers = await getClerkAuthHeaders();

  const response = await fetch(`${API_URL}/${path}`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  const data = responseText ? JSON.parse(responseText) : null;

  return data;
};
