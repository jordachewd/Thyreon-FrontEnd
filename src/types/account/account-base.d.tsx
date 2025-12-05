import { ErrorLike } from "@apollo/client";

export type AccountBaseType = {
  title?: string;
  alignTitle?: "left" | "center" | "right";
  titleSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  loading?: boolean;
  error?: ErrorLike | undefined;
};
