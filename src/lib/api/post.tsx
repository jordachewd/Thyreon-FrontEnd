import { API_URL } from "@/constants/public-api-url";
import { getHeaders } from "./get-headers";

export const post = async (path: string, data: FormData | object) => {
  const headers = await getHeaders();
  const isFormData = data instanceof FormData;

  const resp = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: isFormData
      ? headers
      : { "Content-Type": "application/json", ...headers },
    body: isFormData ? data : JSON.stringify(data),
  });

  return await resp.json();
};
