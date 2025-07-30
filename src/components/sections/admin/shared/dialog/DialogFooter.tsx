import LoadingBubbles from "@/components/shared/LoadingBubbles";
import Button from "@mui/material/Button";
import { memo } from "react";

interface DialogFooterProps {
  loading?: boolean;
  btnText?: string;
  btnColor?: "warning" | "error" | "info";
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: (e?: React.MouseEvent | React.SyntheticEvent) => void;
}

function DialogFooter({
  loading = false,
  btnText = "Submit",
  btnColor,
  onSubmit,
  onCancel,
}: DialogFooterProps) {
  return (
    <>
      {loading && <LoadingBubbles className="!w-auto" />}

      {onCancel && (
        <Button onClick={onCancel} size="small" variant="outlined" color="info">
          Cancel
        </Button>
      )}

      <Button
        onClick={onSubmit}
        variant="outlined"
        size="small"
        color={btnColor}
      >
        {loading ? "Processing ..." : btnText}
      </Button>
    </>
  );
}

export default memo(DialogFooter);
