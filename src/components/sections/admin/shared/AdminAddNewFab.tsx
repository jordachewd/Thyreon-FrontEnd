import { TooltipArrow } from "@/components/shared/TooltipArrow";
import Fab from "@mui/material/Fab";
import { memo } from "react";

interface AdminAddNewFabProps {
  execFn: () => void;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  icon?: string;
  tooltipTitle?: string;
}

function AdminAddNewFab({
  execFn,
  color = "primary",
  size = "small",
  icon = "bi-plus-lg",
  tooltipTitle = "Add New",
}: AdminAddNewFabProps) {
  return (
    <TooltipArrow title={tooltipTitle} placement="left">
      <Fab onClick={execFn} color={color} size={size} aria-label={tooltipTitle}>
        <i className={`bi ${icon} text-lg`}></i>
      </Fab>
    </TooltipArrow>
  );
}
export default memo(AdminAddNewFab);
