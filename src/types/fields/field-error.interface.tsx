export interface ErrorField {
  // value: string | number | boolean | null | undefined;
  value: unknown;
  info: string;
  status: "error";
}
