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

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="flex">
      {!isLoaded && <LoadingBubbles size="small" />}
      {isLoaded && (
        <>
          <TooltipArrow title="Account" placement="bottom">
            <IconButton
              onClick={handleOpenUserMenu}
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
            onClose={handleCloseUserMenu}
          >
            <MenuItem component={Link} href="/">
              <i className="bi bi-house mr-4"></i>
              <span>Home</span>
            </MenuItem>

            <MenuItem component={Link} href="/plans">
              <i className="bi bi-graph-up mr-4"></i>
              <span>Plans</span>
            </MenuItem>

            <MenuItem component={Link} href="/profile">
              <i className="bi bi-person mr-4"></i>
              <span>Profile</span>
            </MenuItem>

            <Divider />

            <MenuItem onClick={() => signOut({ redirectUrl: "/" })}>
              <i className="bi bi-box-arrow-right mr-4"></i>
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}
