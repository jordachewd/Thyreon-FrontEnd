import React, { InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  indeterminate?: boolean;
}

export default function Checkbox({
  label,
  indeterminate,
  className = "",
  ...props
}: CheckboxProps) {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate || false;
    }
  }, [indeterminate]);

  const wrapperClasses = ["checkbox-wrapper", className]
    .filter(Boolean)
    .join(" ");

  if (label) {
    return (
      <label className={wrapperClasses}>
        <input
          ref={checkboxRef}
          type="checkbox"
          className="checkbox-input"
          {...props}
        />
        <span className="checkbox-label">{label}</span>
      </label>
    );
  }

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      className={`checkbox-input ${className}`}
      {...props}
    />
  );
}
