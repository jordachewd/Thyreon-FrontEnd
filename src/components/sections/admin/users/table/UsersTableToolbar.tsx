import {
  Toolbar,
  ToolbarButton,
  FilterPanelTrigger,
  ExportCsv,
  ExportPrint,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveSelectedBtn from "./RemoveSelectedBtn";
import { useState, useRef } from "react";
import { GetUserData } from "@/types/users/get-user-data.d";
import { TableToolbarQuickFilter } from "@/constants/table/toolbar/toolbar-quick-filter.const";
import { TableToolbarButton } from "@/constants/table/toolbar/toolbar-button.const";
import { TableToolbarTextField } from "@/constants/table/toolbar/toolbar-textfield.const";

type ProductsTableToolbarProps = {
  selectedRows: GetUserData[];
};

export default function UsersTableToolbar({
  selectedRows,
}: ProductsTableToolbarProps) {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Toolbar>
      {selectedRows.length > 0 && (
        <div className="flex w-full">
          <RemoveSelectedBtn
            data={{ route: "users", items: { users: selectedRows } }}
          />
        </div>
      )}

      <TableToolbarQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <Tooltip title="Search" enterDelay={0}>
              <TableToolbarButton
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                aria-disabled={state.expanded}
              >
                <i className="bi bi-search text-base"></i>
              </TableToolbarButton>
            </Tooltip>
          )}
        />
        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <TableToolbarTextField
              {...controlProps}
              ownerState={{ expanded: state.expanded }}
              inputRef={ref}
              aria-label="Search"
              placeholder="Search..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="bi bi-search"></i>
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                      >
                        <i className="bi bi-x-circle text-base"></i>
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input,
                },
                ...controlProps.slotProps,
              }}
            />
          )}
        />
      </TableToolbarQuickFilter>

      <Tooltip title="Filters">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge
                badgeContent={state.filterCount}
                color="primary"
                variant="dot"
              >
                <i className="bi bi-funnel text-base"></i>
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ mx: 0.5 }}
      />

      <Tooltip title="Export">
        <ToolbarButton
          ref={exportMenuTriggerRef}
          id="export-menu-trigger"
          aria-controls="export-menu"
          aria-haspopup="true"
          aria-expanded={exportMenuOpen ? "true" : undefined}
          onClick={() => setExportMenuOpen(true)}
        >
          <i className="bi bi-file-earmark-arrow-down text-base"></i>
        </ToolbarButton>
      </Tooltip>

      <Menu
        id="export-menu"
        anchorEl={exportMenuTriggerRef.current}
        open={exportMenuOpen}
        onClose={() => setExportMenuOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: {
            "aria-labelledby": "export-menu-trigger",
          },
        }}
      >
        <ExportPrint
          render={<MenuItem />}
          onClick={() => setExportMenuOpen(false)}
        >
          Print
        </ExportPrint>
        <ExportCsv
          render={<MenuItem />}
          onClick={() => setExportMenuOpen(false)}
        >
          Download as CSV
        </ExportCsv>
      </Menu>
    </Toolbar>
  );
}
