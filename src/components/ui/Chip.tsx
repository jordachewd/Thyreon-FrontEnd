import React from "react";

export interface ChipProps {
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
  variant?: "filled" | "outlined";
  size?: "small" | "medium";
  onDelete?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function Chip({
  label,
  color = "default",
  variant = "filled",
  size = "medium",
  onDelete,
  icon,
  className = "",
}: ChipProps) {
  const classNames = [
    "chip",
    `chip-${color}`,
    `chip-${variant}`,
    `chip-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {icon && <span className="mr-1">{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          className="chip-delete-icon"
          onClick={onDelete}
          aria-label="Delete"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}
