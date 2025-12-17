import { Tooltip } from "@/components/ui";
import { Button } from "@/components/ui";

interface AdminAddNewFabProps {
  execFn: () => void;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  icon?: string;
  tooltipTitle?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

export default function AdminAddNewFab({
  execFn,
  size = "small",
  icon = "bi-plus-lg",
  tooltipTitle = "Add New",
  tooltipPlacement = "left",
}: AdminAddNewFabProps) {
  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <Button
        onClick={execFn}
        variant="primary"
        size={size}
        aria-label={tooltipTitle}
        className="rounded-full w-10 h-10 min-w-0 p-0 fixed bottom-6 right-6 shadow-lg z-50"
      >
        <i className={`bi ${icon} text-base`}></i>
      </Button>
    </Tooltip>
  );
}
