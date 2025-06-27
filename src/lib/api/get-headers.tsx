import { cookies } from "next/headers";

export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});