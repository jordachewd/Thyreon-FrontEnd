export interface ToolbarSelectedIds {
  type: "include" | "exclude";
  ids: Set<string | number>;
}
