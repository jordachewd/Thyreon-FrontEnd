import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { memo } from "react";

interface DialogHeadProps {
  title: string;
  must?: boolean;
  onClose: () => void;
}

function DialogHeader({ title, must = false, onClose }: DialogHeadProps) {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col">
        <Typography variant="h4">{title}</Typography>
        {must && (
          <span className="text-red-600 textxxs leading-none">* required</span>
        )}
      </div>
      <Button onClick={onClose} size="small">
        <i className="bi bi-x-lg"></i>
      </Button>
    </div>
  );
}

export default memo(DialogHeader);
