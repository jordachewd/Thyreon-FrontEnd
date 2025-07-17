import Fab from "@mui/material/Fab";
import { memo } from "react";

interface AdminAddNewButtonProps {
  execFn: () => void;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

function AdminAddNewButton({
  execFn,
  color = "primary",
  size = "small",
}: AdminAddNewButtonProps) {
  return (
    <Fab onClick={execFn} color={color} size={size}>
      <i className="bi bi-plus-lg text-lg"></i>
    </Fab>
  );
}
export default memo(AdminAddNewButton);
