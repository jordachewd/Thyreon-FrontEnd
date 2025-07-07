import Fab from "@mui/material/Fab";

interface AdminAddNewButtonProps {
  execFn: () => void;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export default function AdminAddNewButton({
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
