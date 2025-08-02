import Button from "@mui/material/Button";
import { memo } from "react";

interface DialogFooterProps {
  loading?: boolean;
  btnSubmitTxt?: string;
  btnColor?: "warning" | "error" | "info";
  onSubmit?: (e: React.FormEvent) => void;
  children?: React.ReactNode;
}

function DialogFooter({
  children,
  loading = false,
  btnSubmitTxt = "Submit",
  btnColor,
  onSubmit,
}: DialogFooterProps) {
  return (
    <div className="flex !m-4 !mt-0 justify-between items-center w-full gap-4">
      <div className="flex-1">{children}</div>

      {onSubmit && (
        <Button
          onClick={onSubmit}
          variant="outlined"
          size="small"
          color={btnColor}
          disabled={loading}
        >
          {loading ? "Processing ..." : btnSubmitTxt}
        </Button>
      )}
    </div>
  );
}

export default memo(DialogFooter);
