"use client";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent, memo, useCallback } from "react";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import ToggleTheme from "@/components/shared/ToggleTheme";
import Link from "next/link";

function AdminHeaderMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const handleOpenMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <div className="flex">
      <TooltipArrow title="Navigation" placement="bottom">
        <IconButton
          onClick={handleOpenMenu}
          sx={{ p: 0, backgroundColor: "transparent!important" }}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-controls={open ? "admin-nav" : undefined}
        >
          <i className="bi bi-menu-app text-base"></i>
        </IconButton>
      </TooltipArrow>

      <Menu
        keepMounted
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseMenu}
      >
        <MenuItem component={Link} href="/" onClick={handleCloseMenu}>
          <i className="bi bi-house !mr-4"></i>
          <span>Home</span>
        </MenuItem>

        <MenuItem component={Link} href="/profile" onClick={handleCloseMenu}>
          <i className="bi bi-person !mr-4"></i>
          <span>Profile & Billing</span>
        </MenuItem>

        <MenuItem component={Link} href="/plans" onClick={handleCloseMenu}>
          <i className="bi bi-graph-up !mr-4"></i>
          <span>Plans & FAQs</span>
        </MenuItem>

        <Divider />
        <div className="flex justify-center items-center !px-5 !py-1 gap-4">
          <span>Theme:</span>
          <ToggleTheme />
        </div>
      </Menu>
    </div>
  );
}

export default memo(AdminHeaderMenu);
