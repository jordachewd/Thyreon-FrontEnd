export interface ErrorField {
  // value: string | number | boolean | null | undefined;
  value: unknown | null | undefined;
  info: string;
  status: "error";
}
