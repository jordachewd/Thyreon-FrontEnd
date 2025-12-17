import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "danger";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      fullWidth = false,
      loading = false,
      disabled,
      startIcon,
      endIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = [
      "btn",
      `btn-${variant}`,
      `btn-${size}`,
      fullWidth && "btn-full-width",
      loading && "btn-loading",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="btn-spinner" />}
        {!loading && startIcon && (
          <span className="flex items-center">{startIcon}</span>
        )}
        <span>{children}</span>
        {!loading && endIcon && (
          <span className="flex items-center">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
