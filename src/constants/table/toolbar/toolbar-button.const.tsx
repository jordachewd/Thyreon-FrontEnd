import { styled } from "@mui/material";
import { ToolbarButton } from "@mui/x-data-grid";
import { OwnerState } from "./toolbar-owner-state.type";

export const TableToolbarButton = styled(ToolbarButton)<{
  ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
  gridArea: "1 / 1",
  width: "min-content",
  height: "min-content",
  zIndex: 1,
  opacity: ownerState.expanded ? 0 : 1,
  pointerEvents: ownerState.expanded ? "none" : "auto",
  transition: theme.transitions.create(["opacity"]),
}));
