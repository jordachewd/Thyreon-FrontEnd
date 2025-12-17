"use client";

import { IconButton, Tooltip } from "@/components/ui";
import { useAdminUi } from "@/components/layout/providers/AdminUiProvider";
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
    <Tooltip placement="right" title={show ? title : ""}>
      <IconButton
        size="small"
        onClick={handleUpdateSb}
        className="px-2 py-1 rounded-lg leading-none"
      >
        <i className={`bi ${icon}`}></i>
      </IconButton>
    </Tooltip>
  ) : null;
}
