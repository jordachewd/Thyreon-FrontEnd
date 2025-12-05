"use client";

import { IconButton } from "@mui/material";
import { TooltipArrow } from "../../../shared/TooltipArrow";
import { useAdminUi } from "@/context/AdminUiContext";
import { useCallback } from "react";

interface SidebarToggleProps {
  show?: boolean;
  icon: string;
}

export default function SidebarToggle({
  show = true,
  icon,
}: SidebarToggleProps) {
  const { sidebarCtx } = useAdminUi();
  const { isNavOpen, updateSb } = sidebarCtx;

  const title = isNavOpen ? "Show menu" : "Hide menu";
  const handleUpdateSb = useCallback(updateSb, []);

  return show ? (
    <TooltipArrow
      placement="right"
      title={show ? title : null}
      className="transition-all!"
    >
      <IconButton
        size="small"
        onClick={handleUpdateSb}
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
