import { API_URL } from "@/constants/public-api-url";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const post = async (path: string, data: FormData | object) => {
  const isFormData = data instanceof FormData;
  const headers = await getClerkAuthHeaders(isFormData);

  const resp = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  return await resp.json();
};
