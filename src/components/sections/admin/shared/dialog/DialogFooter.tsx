import LoadingBubbles from "@/components/shared/LoadingBubbles";
import Button from "@mui/material/Button";
import { memo } from "react";

interface DialogFooterProps {
  loading?: boolean;
  btnSubmitTxt?: string;
  btnCancelTxt?: string;
  btnColor?: "warning" | "error" | "info";
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: (e?: React.MouseEvent | React.SyntheticEvent) => void;
  children?: React.ReactNode;
}

function DialogFooter({
  children,
  loading = false,
  btnSubmitTxt = "Submit",
  btnCancelTxt = "Cancel",
  btnColor,
  onSubmit,
  onCancel,
}: DialogFooterProps) {
  return (
    <div className="flex !m-4 !mt-0 justify-between items-center w-full gap-4">
      {children && <div className="flex-1">{children}</div>}

      {onCancel && (
        <div className="flex flex-1">
          <Button
            onClick={onCancel}
            size="small"
            variant="outlined"
            color="info"
          >
            {btnCancelTxt}
          </Button>
        </div>
      )}

      {onSubmit && (
        <div className="flex flex-1 justify-end">
          {loading && <LoadingBubbles className="!w-auto !ml-auto" />}
          <Button
            onClick={onSubmit}
            variant="outlined"
            size="small"
            color={btnColor}
          >
            {loading ? "Processing ..." : btnSubmitTxt}
          </Button>
        </div>
      )}
    </div>
  );
}

export default memo(DialogFooter);
