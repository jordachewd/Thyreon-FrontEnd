import { API_URL } from "@/constants/public-api-url";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const post = async (path: string, data: FormData | object) => {
  const headers = await getClerkAuthHeaders();
  const isFormData = data instanceof FormData;

  const resp = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  return await resp.json();
};
