import { API_URL } from "@/constants/public-api-url";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const patch = async (path: string, data: FormData | object) => {
  const isFormData = data instanceof FormData;
  const headers = await getClerkAuthHeaders(isFormData);

  const resp = await fetch(`${API_URL}/${path}`, {
    method: "PATCH",
    headers: headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  return await resp.json();
};
