"use server";

import { revalidateTag } from "next/cache";

import { BulkDeleteProps } from "@/types/bulk-delete.interface";
import { del } from "../api/delete";

export default async function bulkDelete({ route, items }: BulkDeleteProps) {
  const selected = Object.values(items)[0];

  if (!Array.isArray(selected) || selected.length === 0) {
    return { status: "error", message: "No items selected for deletion" };
  }

  let body: Record<string, unknown>;

  switch (route) {
    case "users":
      body = {
        users: selected.map((user) => ({
          username: user.username,
          email: user.email,
        })),
      };
      break;

    /*     case "products":
      body = {
        products: selected.map((item) => Number(item.id)),
      };
      break;

    case "prod-categories":
      body = {
        categories: selected.map((item) => Number(item.id)),
      };
      break;

    case "prod-tags":
      body = {
        tags: selected.map((item) => Number(item.id)),
      };
      break; */

    default:
      throw new Error(`Unknown delete route: ${route}`);
  }

  const deleteAll = await del(`${route}/bulk`, body);

  if (deleteAll.status === "error") {
    return deleteAll;
  }

  revalidateTag(route);
  return deleteAll;
}
