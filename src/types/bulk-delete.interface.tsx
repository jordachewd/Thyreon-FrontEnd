import { BulkDeleteItems } from "./bulk-delete-items.interface";

export interface BulkDeleteProps {
  route: "users" | "test";
  items: BulkDeleteItems;
}
