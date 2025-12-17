import { ButtonHTMLAttributes } from "react";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
}

export default function IconButton({
  children,
  size = "medium",
  className = "",
  ...props
}: IconButtonProps) {
  const classNames = ["icon-button", `icon-button-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
