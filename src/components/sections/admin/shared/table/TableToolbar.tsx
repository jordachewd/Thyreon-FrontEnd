" use client";

import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { TableToolbarButton } from "@/constants/table/toolbar/toolbar-button.const";
import { TableToolbarQuickFilter } from "@/constants/table/toolbar/toolbar-quick-filter.const";
import { TableToolbarTextField } from "@/constants/table/toolbar/toolbar-textfield.const";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Toolbar,
  QuickFilterTrigger,
  QuickFilterControl,
  QuickFilterClear,
  ExportPrint,
  ExportCsv,
} from "@mui/x-data-grid";

type TableToolbarProps = {
  toolbarContent?: React.ReactNode;
};

export default function TableToolbar({ toolbarContent }: TableToolbarProps) {
  return (
    <Toolbar>
      {toolbarContent && <div className="flex w-full">{toolbarContent}</div>}

      <TableToolbarQuickFilter>
        <QuickFilterTrigger
          render={(triggerProps, state) => (
            <TooltipArrow title="Search" placement="bottom">
              <TableToolbarButton
                size="small"
                {...triggerProps}
                ownerState={{ expanded: state.expanded }}
                aria-disabled={state.expanded}
              >
                <i className="bi bi-search text-base"></i>
              </TableToolbarButton>
            </TooltipArrow>
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
                        <i className="bi bi-x-circle text-xs"></i>
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

      <TooltipArrow title="Export CSV" placement="bottom">
        <ExportPrint render={<Button size="small" />}>
          <i className="bi bi-printer text-base"></i>
        </ExportPrint>
      </TooltipArrow>

      <TooltipArrow title="Print" placement="bottom">
        <ExportCsv render={<Button size="small" />}>
          <i className="bi bi-file-earmark-arrow-down text-base"></i>
        </ExportCsv>
      </TooltipArrow>
    </Toolbar>
  );
}
