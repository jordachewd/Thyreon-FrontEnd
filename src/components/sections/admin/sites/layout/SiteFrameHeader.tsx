import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";
import PageHead from "@/components/layout/common/PageHead";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { GET_SITE_BY_ID } from "@/constants/graphql/sites/get-site-by-id.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";
import { Chip } from "@mui/material";

type SiteFrameHeaderProps = {
  siteId: number;
  className?: string;
};

export default function SiteFrameHeader({
  siteId,
  className: style,
}: SiteFrameHeaderProps) {
  const { data, loading, error } = useQuery<{ siteById: GetSiteData }>(
    GET_SITE_BY_ID,
    {
      variables: { id: Number(siteId) },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  if (loading)
    return (
      <header className={style}>
        <LoadingBubbles align="left" size="small" />
      </header>
    );

  if (error)
    return (
      <header className={style}>
        <ErrorCard mini error={error.message} />
      </header>
    );

  const siteData = data?.siteById as GetSiteData;
  const status = siteData.status;
  const statusColor = status === "active" ? "success" : "error";
  const chipColor = status === "revoked" ? "primary" : statusColor;

  return (
    <header className={style}>
      <PageHead
        title={siteData.siteName}
        titleLink={siteData.domain}
        alignTitle="left"
      >
        <div className="flex flex-1 items-center gap-4">
          <Chip size="small" label={status} color={chipColor} />
          <ExternalLinkIcon
            href={`https://${siteData.domain}`}
            tooltip={`Go to ${siteData.domain}`}
            rel="noopener noreferrer"
            target="_blank"
          />
        </div>
      </PageHead>
    </header>
  );
}
