import Tooltip from "@/components/ui/Tooltip";
import IconButton from "@/components/ui/IconButton";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { memo } from "react";

type SiteActionCellProps = {
  params: { row: any; value: any };
  onEdit: (userData: Partial<GetSiteData>) => void;
  onRemove: (userData: Partial<GetSiteData>) => void;
};

function SiteActionCell({ params, onEdit, onRemove }: SiteActionCellProps) {
  return (
    <div className="flex gap-2 items-center">
      <Tooltip title="Edit" placement="bottom">
        <IconButton
          size="small"
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
      </Tooltip>

      <Tooltip title="Delete" placement="bottom">
        <IconButton
          size="small"
          onClick={() =>
            onRemove({
              id: params.row.id,
              domain: params.row.domain,
            })
          }
        >
          <i className="bi bi-trash3 text-xs"></i>
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default memo(SiteActionCell);
