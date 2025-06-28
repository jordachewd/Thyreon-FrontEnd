import { API_URL } from "@/constants/public-api-url";
import { UpdateUserData } from "@/types/update-user-data.d";
import { getClerkAuthHeaders } from "./get-clerk-auth-headers";

export const patch = async (
  path: string,
  data: UpdateUserData | FormData | object
) => {
  const headers = await getClerkAuthHeaders();
  const isFormData = data instanceof FormData;
  const resp = await fetch(`${API_URL}/${path}`, {
    method: "PATCH",
    headers: headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  return await resp.json();
};
