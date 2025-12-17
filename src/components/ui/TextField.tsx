import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      multiline = false,
      rows = 3,
      startAdornment,
      endAdornment,
      className = '',
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const errorMessage = typeof error === 'string' ? error : '';
    const hasError = !!error;

    const wrapperClasses = [
      'text-field-wrapper',
      fullWidth && 'text-field-wrapper-full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'text-field-input',
      hasError && 'text-field-input-error',
    ]
      .filter(Boolean)
      .join(' ');

    const InputComponent = multiline ? 'textarea' : 'input';

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className="text-field-label">
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <InputComponent
          ref={ref as any}
          className={inputClasses}
          disabled={disabled}
          required={required}
          rows={multiline ? rows : undefined}
          {...(props as any)}
        />
        {(hasError && errorMessage) || helperText ? (
          <p className={hasError ? 'text-field-error-message' : 'text-field-helper-text'}>
            {hasError ? errorMessage : helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
