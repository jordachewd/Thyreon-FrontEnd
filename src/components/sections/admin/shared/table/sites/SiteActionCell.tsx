import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import IconButton from "@mui/material/IconButton";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { memo } from "react";

type SiteActionCellProps = {
  params: GridRenderCellParams;
  onEdit: (userData: Partial<GetSiteData>) => void;
  onRemove: (userData: Partial<GetSiteData>) => void;
};

function SiteActionCell({ params, onEdit, onRemove }: SiteActionCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <TooltipArrow title="Edit" placement="bottom">
        <IconButton
          sx={{ p: 0.5, backgroundColor: "transparent!important" }}
          onClick={() =>
            onEdit({
              id: params.row.id,
              siteName: params.row.siteName,
              domain: params.row.domain,
            })
          }
        >
          <i className="bi bi-pen text-xs"></i>
        </IconButton>
      </TooltipArrow>

      <TooltipArrow title="Delete" placement="bottom">
        <IconButton
          sx={{ p: 0.5, backgroundColor: "transparent!important" }}
          onClick={() =>
            onRemove({
              id: params.row.id,
              domain: params.row.domain,
            })
          }
        >
          <i className="bi bi-trash3 text-xs"></i>
        </IconButton>
      </TooltipArrow>
    </div>
  );
}

export default memo(SiteActionCell);
