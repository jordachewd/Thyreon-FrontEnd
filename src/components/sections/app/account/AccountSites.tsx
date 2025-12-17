import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { AccountSitesType } from "@/types/account/account-sites.d";
import { UserRole } from "@/types/users/user-role.d";
import { Typography } from "@/components/ui";
import Link from "next/link";
import AccountWrapper from "./AccountWrapper";
import classNames from "classnames";

type AccountSitesProps = AccountSitesType & {
  role: UserRole;
};

export default function AccountSites({
  sites,
  title,
  alignTitle,
  titleSize,
  loading,
  error,
  role,
}: AccountSitesProps) {
  if (loading) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <LoadingBubbles />
      </AccountWrapper>
    );
  }

  if (error) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <ErrorCard mini error={error.message} title="" />
      </AccountWrapper>
    );
  }

  if (!sites) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <Typography variant="body2" className="text-slate-400! text-center">
          No registered sites yet.
        </Typography>
      </AccountWrapper>
    );
  }

  const isAdmin = role === "admin";
  const urlPrefix = isAdmin ? "/admin/sites" : "/sites";

  return (
    <AccountWrapper title={title} alignTitle={alignTitle} titleSize={titleSize}>
      <div className="account-table">
        <div className="account-table-head">
          <div className="flex-1">Site Name</div>
          <div className="flex-1">Domain</div>
          <div className="flex-1">Registered</div>
          <div className="min-w-14 text-center">Status</div>
        </div>

        {sites.map((site, index) => {
          const isActive = index === 0;
          const txnStatus = isActive ? "Active" : "Inactive";
          const txnColor = isActive ? "account-active" : "account-inactive";

          const tableRowCss = classNames("account-table-row", {
            ["font-medium text-midnight-400! dark:text-vanilla-400!"]: isActive,
          });

          const createdAtText = getFormattedDate(
            new Date(site.createdAt as Date)
          );

          return (
            <div key={site.id} className={tableRowCss}>
              <div className="flex-1">
                <Link
                  href={`${urlPrefix}/${site.id}`}
                  className="hover:text-leaf-green-400"
                >
                  {site.siteName}
                </Link>
              </div>

              <div className="flex flex-1 gap-3">
                <span>{site.domain}</span>

                <ExternalLinkIcon
                  href={`https://${site.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  tooltip={`Go to ${site.domain}`}
                  iconSize="text-xs"
                />
              </div>
              <div className="flex-1 textxxs">{createdAtText}</div>

              <div className="min-w-14 textxxs text-center">
                <span className={txnColor}>{txnStatus}</span>
              </div>
            </div>
          );
        })}
      </div>
    </AccountWrapper>
  );
}
