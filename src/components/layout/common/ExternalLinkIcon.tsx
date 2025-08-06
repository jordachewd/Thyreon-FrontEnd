import { TooltipArrow } from "@/components/shared/TooltipArrow";
import Link from "next/link";
import { memo } from "react";

type ExternalLinkIconType = {
  href: string;
  target?: string;
  rel?: string;
  tooltip: string;
};

function ExternalLinkIcon({
  href,
  target = "_self",
  rel = "",
  tooltip,
}: ExternalLinkIconType) {
  const icon = "bi bi-box-arrow-up-right";
  const linkCss = "flex items-center leading-none";
  return (
    <TooltipArrow title={tooltip} placement="bottom">
      <Link href={href} target={target} rel={rel} className={linkCss}>
        <i className={`${icon} text-leaf-green-400 text-base`} />
      </Link>
    </TooltipArrow>
  );
}

export default memo(ExternalLinkIcon);
