"use client";

import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
import { Alert } from "@/components/ui";
import { memo, useCallback, useEffect, useState } from "react";

function AlertMessage() {
  const { alertCtx } = useAdminUi();
  const { message, updateAlert } = alertCtx;
  const { text, severity } = message;
  const [isVisible, setIsVisible] = useState(false);

  const openAlert = text.length > 0;
  const clearAlert = { text: "", severity: "info" as const };

  useEffect(() => {
    if (openAlert) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 7000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [openAlert]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      updateAlert(clearAlert);
    }, 300); // Wait for animation
  }, [updateAlert]);

  if (!openAlert && !isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-999999 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ maxWidth: "400px" }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </Alert>
    </div>
  );
}

export default memo(AlertMessage);
