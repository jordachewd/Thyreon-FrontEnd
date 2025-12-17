import { InputHTMLAttributes } from "react";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: "small" | "medium" | "large";
}

export default function Switch({
  label,
  size = "medium",
  className = "",
  ...props
}: SwitchProps) {
  const sizeClass = `switch-${size}`;

  if (label) {
    return (
      <label className={`switch-wrapper ${className}`}>
        <span className="switch-label">{label}</span>
        <div className="relative inline-block">
          <input type="checkbox" className="switch-input" {...props} />
          <span
            className={`${
              props.checked
                ? "switch-track switch-track-on"
                : "switch-track switch-track-off"
            } ${sizeClass}`}
          >
            <span
              className={
                props.checked ? "switch-thumb switch-thumb-on" : "switch-thumb"
              }
            />
          </span>
        </div>
      </label>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <input type="checkbox" className="switch-input" {...props} />
      <span
        className={`${
          props.checked
            ? "switch-track switch-track-on"
            : "switch-track switch-track-off"
        } ${sizeClass}`}
      >
        <span
          className={
            props.checked ? "switch-thumb switch-thumb-on" : "switch-thumb"
          }
        />
      </span>
    </div>
  );
}
