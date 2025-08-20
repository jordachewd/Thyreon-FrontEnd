"use client";

import { useAdminUi } from "@/context/AdminUiContext";
import { alertDefaults } from "@/context/constants/alert-defaults.const";

import {
  SlideProps,
  Slide,
  SnackbarCloseReason,
  Snackbar,
  Alert,
} from "@mui/material";
import { memo } from "react";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function AlertMessage() {
  const { alertCtx } = useAdminUi();
  const { message, updateAlert } = alertCtx;
  const { text, severity } = message;

  const openAlert = text.length > 0;
  const clearAlert = alertDefaults.message;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();

    if (reason === "clickaway") return;
    updateAlert(clearAlert);
  };

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
