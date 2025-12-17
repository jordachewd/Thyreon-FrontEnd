import React from 'react';

export interface AlertProps {
  children: React.ReactNode;
  severity?: 'success' | 'info' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  children,
  severity = 'info',
  onClose,
  className = '',
}: AlertProps) {
  const classNames = [
    'alert',
    `alert-${severity}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const icons = {
    success: 'bi-check-circle-fill',
    info: 'bi-info-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    error: 'bi-x-circle-fill',
  };

  return (
    <div className={classNames} role="alert">
      <i className={`bi ${icons[severity]} alert-icon-${severity}`}></i>
      <div className="alert-content">{children}</div>
      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}
