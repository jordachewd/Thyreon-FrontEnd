import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

interface CopyTextFieldProps {
  label: string;
  value: string;
  doneCopied?: (copied: boolean) => void;
}

export default function CopyTextField({
  label,
  value,
  doneCopied,
}: CopyTextFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (doneCopied) doneCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      variant="outlined"
      className="!mt-4"
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={copied ? "Copied!" : "Copy"}>
                <IconButton onClick={handleCopy} edge="end">
                  <i className="bi bi-copy text-base"></i>
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
