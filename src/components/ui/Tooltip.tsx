'use client';

import React, { useState } from 'react';

export interface TooltipProps {
  children: React.ReactElement;
  title: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ children, title, placement = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && title && (
        <div className={`tooltip-content tooltip-${placement}`}>
          {title}
        </div>
      )}
    </div>
  );
}
