import { IconButton } from "@mui/material";
import { TooltipArrow } from "../../shared/TooltipArrow";
import { memo } from "react";

interface SidebarToggleProps {
  title?: string | null;
  show?: boolean;
  icon: string;
  toggleSidebar: () => void;
}

function SidebarToggle({
  title = null,
  show = true,
  icon,
  toggleSidebar,
}: SidebarToggleProps) {
  return show ? (
    <TooltipArrow
      placement="right"
      title={show ? title : null}
      className="transition-all!"
    >
      <IconButton
        size="small"
        onClick={() => toggleSidebar()}
        sx={{
          padding: "4px 7px",
          borderRadius: "8px!important",
          lineHeight: 1,
        }}
      >
        <i className={`bi ${icon}`}></i>
      </IconButton>
    </TooltipArrow>
  ) : null;
}

export default memo(SidebarToggle);
