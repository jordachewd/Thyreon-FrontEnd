import { AlertParams } from "@/types/alert-message.interface";
import {
  Alert,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useEffect, useState } from "react";

interface AlertMessageProps {
  message: AlertParams;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function AlertMessage({ message }: AlertMessageProps) {
  const { text, severity = "info", variant = "filled" } = message;
  const [openAlert, setOpenAlert] = useState(false);

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
  }, [message, text]);

  return (
    <Snackbar
      open={openAlert}
      onClose={handleClose}
      autoHideDuration={6000}
      slots={{ transition: SlideTransition }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 100 }}
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
