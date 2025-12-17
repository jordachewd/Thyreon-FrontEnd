import { Tooltip } from "@/components/ui";
import { TooltipProps } from "@/components/ui/Tooltip";

export const TooltipArrow = ({ children, ...props }: TooltipProps) => (
  <Tooltip {...props}>
    {children}
  </Tooltip>
);
