import { TooltipArrow } from "@/components/shared/TooltipArrow";
import Fab from "@mui/material/Fab";

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
  color = "primary",
  size = "small",
  icon = "bi-plus-lg",
  tooltipTitle = "Add New",
  tooltipPlacement = "left",
}: AdminAddNewFabProps) {
  return (
    <TooltipArrow title={tooltipTitle} placement={tooltipPlacement}>
      <Fab onClick={execFn} color={color} size={size} aria-label={tooltipTitle}>
        <i className={`bi ${icon} text-base`}></i>
      </Fab>
    </TooltipArrow>
  );
}
