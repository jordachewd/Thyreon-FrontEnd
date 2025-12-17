import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";
import PageHead from "@/components/layout/common/PageHead";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { Chip } from "@mui/material";

type SiteFrameHeaderProps = {
  site: GetSiteData;
  siteId: number;
  className?: string;
};

export default function SiteFrameHeader({
  site,
  className: style,
}: SiteFrameHeaderProps) {
  const status = site.status;
  const statusColor = status === "active" ? "success" : "error";
  const chipColor = status === "revoked" ? "primary" : statusColor;

  return (
    <header className={style}>
      <PageHead
        title={site.siteName}
        titleLink={site.domain}
        alignTitle="left"
      >
        <div className="flex flex-1 items-center gap-4">
          <Chip size="small" label={status} color={chipColor} />
          <ExternalLinkIcon
            href={`https://${site.domain}`}
            tooltip={`Go to ${site.domain}`}
            rel="noopener noreferrer"
            target="_blank"
          />
        </div>
      </PageHead>
    </header>
  );
}
