import { API_URL } from "@/constants/public-api-url"; 
import { getHeaders } from "./get-headers";
import { UpdateUserData } from "@/types/update-user-data.d";

export const patch = async (
  path: string,
  data: UpdateUserData | FormData | object
) => {
  const headers = await getHeaders();
  const isFormData = data instanceof FormData;
  const resp = await fetch(`${API_URL}/${path}`, {
    method: "PATCH",
    headers: isFormData
      ? headers
      : { "Content-Type": "application/json", ...headers },
    body: isFormData ? data : JSON.stringify(data),
  });

  return await resp.json();
};
