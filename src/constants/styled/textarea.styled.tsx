import { styled, TextareaAutosize } from "@mui/material";

export const StyledTextarea = styled(TextareaAutosize)(() => ({
  width: "100%",
  padding: "10px 14px",
  fontSize: "13px",
  border: "1px solid #bfbfbf",
  borderRadius: "4px",
  background: "transparent",
  transition: "border-color 0.2s ease-in-out",
  "&:hover": {
    borderColor: "#000",
  },
}));
