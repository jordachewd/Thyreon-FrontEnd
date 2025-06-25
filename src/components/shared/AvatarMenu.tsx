"use client";
import { IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useState, MouseEvent } from "react";
import { TooltipArrow } from "./TooltipArrow";
import { useClerk, useUser } from "@clerk/clerk-react";
import { getAvatarInitials } from "@/lib/utils/getAvatarInitials";
import LoadingBubbles from "./LoadingBubbles";
import Link from "next/link";

export default function AvatarMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    signOut({ redirectUrl: "/" });
  };

  return (
    <div className="flex">
      {!isLoaded && <LoadingBubbles size="small" />}
      {isLoaded && (
        <>
          <TooltipArrow title="Account" placement="bottom">
            <IconButton
              onClick={handleOpenMenu}
              sx={{ p: 0, backgroundColor: "transparent!important" }}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              aria-controls={open ? "my-account" : undefined}
            >
              <Avatar
                alt={user?.fullName ?? undefined}
                src={user?.imageUrl ?? undefined}
                sx={{ width: 28, height: 28 }}
                {...getAvatarInitials(user?.fullName ?? "")}
              />
            </IconButton>
          </TooltipArrow>

          <Menu
            keepMounted
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseMenu}
          >
            <MenuItem component={Link} href="/" onClick={handleCloseMenu}>
              <i className="bi bi-house mr-4"></i>
              <span>Home</span>
            </MenuItem>

            <MenuItem component={Link} href="/plans" onClick={handleCloseMenu}>
              <i className="bi bi-graph-up mr-4"></i>
              <span>Plans</span>
            </MenuItem>

            <MenuItem
              component={Link}
              href="/profile"
              onClick={handleCloseMenu}
            >
              <i className="bi bi-person mr-4"></i>
              <span>Profile</span>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <i className="bi bi-box-arrow-right mr-4"></i>
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}
