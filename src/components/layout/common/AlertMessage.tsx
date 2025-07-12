"use client";
import {
  Alert,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useAdminContext } from "@/context/admin/AdminContext";
import { AlertMessageParams } from "@/context/admin/types/alert/alert-msg-params.interface";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function AlertMessage() {
  const { alertCtx } = useAdminContext();
  const [openAlert, setOpenAlert] = useState(false);

  const {
    text = "",
    severity = "info",
    variant = "filled",
  } = alertCtx?.message as AlertMessageParams;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (text !== "") {
      setOpenAlert(true);
    }
  }, [text]);

  return (
    <Snackbar
      open={openAlert}
      onClose={handleClose}
      autoHideDuration={10000}
      slots={{ transition: SlideTransition }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 999999999 }}
    >
      <Alert
        onClose={handleClose}
        variant={variant}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </Alert>
    </Snackbar>
  );
}

export default memo(AlertMessage);
