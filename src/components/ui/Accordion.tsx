"use client";

import { memo, useState } from "react";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

function Accordion({ title, children, defaultExpanded = false, className = "" }: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={`accordion ${className}`}>
      <button
        className="accordion-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="accordion-title">{title}</span>
        <i className={`bi ${expanded ? "bi-chevron-up" : "bi-chevron-down"} accordion-icon`}></i>
      </button>
      {expanded && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default memo(Accordion);
