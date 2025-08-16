"use client";

import { useAdminContext } from "@/context/AdminContext";
import { alertDefaults } from "@/context/constants/alert-defaults.const";
import { AlertMessageParams } from "@/context/types/alert-msg-params.d";
import {
  SlideProps,
  Slide,
  SnackbarCloseReason,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect, memo } from "react";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function AlertMessage() {
  const { message, updateAlert } = useAdminContext().alertCtx;
  const [openAlert, setOpenAlert] = useState(false);
  const { text, severity } = message as AlertMessageParams;
  const clearAlert = alertDefaults.message;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();

    if (reason === "clickaway") return;
    updateAlert(clearAlert);
    setOpenAlert(false);
  };

  useEffect(() => {
    if (text && text.length > 0) {
      setOpenAlert(true);
    }
  }, [text]);

  return (
    <Snackbar
      open={openAlert}
      onClose={handleClose}
      autoHideDuration={7000}
      slots={{ transition: SlideTransition }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 999999999 }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </Alert>
    </Snackbar>
  );
}

export default memo(AlertMessage);
