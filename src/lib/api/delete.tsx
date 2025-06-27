import { API_URL } from "@/constants/public-api-url";
import { getHeaders } from "./get-headers";

export const del = async (path: string, body?: Record<string, unknown>) => {
  const headers = await getHeaders();

  const response = await fetch(`${API_URL}/${path}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  const data = responseText ? JSON.parse(responseText) : null;

  return data;
};
