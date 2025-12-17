'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = false,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !disableEscapeKeyDown && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose, disableEscapeKeyDown]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && !disableBackdropClick) {
      onClose();
    }
  };

  if (!open) return null;

  const dialogClasses = [
    'dialog-content',
    `dialog-${maxWidth}`,
    fullWidth && 'w-full',
  ]
    .filter(Boolean)
    .join(' ');

  const dialogContent = (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div ref={dialogRef} className={dialogClasses} role="dialog" aria-modal="true">
        {title && (
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}

export function DialogActions({ children }: { children: React.ReactNode }) {
  return <div className="dialog-footer">{children}</div>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="dialog-body">{children}</div>;
}
