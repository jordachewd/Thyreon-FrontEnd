import { Button, Menu } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export default function TableActions({
  children,
  closeMenu,
}: Readonly<{
  children: ReactNode;
  closeMenu?: boolean;
}>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenActions = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (closeMenu) {
      setAnchorEl(null);
    }
  }, [closeMenu]);

  return (
    <div className="flex gap-4">
      <Button
        size="small"
        id="actionsBtn"
        aria-haspopup="true"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        onClick={handleOpenActions}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseActions}
        slotProps={{
          list: {
            "aria-labelledby": "actionsBtn",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </Menu>
    </div>
  );
}
