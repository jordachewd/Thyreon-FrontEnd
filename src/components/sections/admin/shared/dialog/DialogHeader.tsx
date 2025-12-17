import { Button, Typography } from "@/components/ui";
import { memo } from "react";

interface DialogHeadProps {
  title: string;
  must?: boolean;
  onClose: () => void;
}

function DialogHeader({ title, must = false, onClose }: DialogHeadProps) {
  return (
    <div className="flex w-full justify-between items-center relative">
      <Typography variant="h4" className="flex flex-col z-0">
        <span> {title}</span>
        {must && (
          <span className="text-red-600 textxxs leading-none">* required</span>
        )}
      </Typography>

      <Button onClick={onClose} size="small" className="absolute -right-6 -top-4">
        <i className="bi bi-x-lg"></i>
      </Button>
    </div>
  );
}

export default memo(DialogHeader);
