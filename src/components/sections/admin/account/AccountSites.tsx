"use client";

import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";
import { useUserRole } from "@/lib/hooks/users/useUserRole";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { AccountSitesType } from "@/types/account/account-sites.d";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";
import css from "@/styles/sections/admin/AccountBilling.module.css";
import AccountWrapper from "./AccountWrapper";

function AccountSites({
  data,
  title,
  alignTitle,
  titleSize,
}: AccountSitesType) {
  const sites = data as GetSiteData[];

  const { isAdmin } = useUserRole();
  const urlPrefix = isAdmin ? "/admin/sites" : "/sites";

  if (!sites || sites.length === 0) {
    return (
      <AccountWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <Typography variant="body2" className="!text-slate-400 text-center">
          No registered sites yet.
        </Typography>
      </AccountWrapper>
    );
  }

  return (
    <AccountWrapper title={title} alignTitle={alignTitle} titleSize={titleSize}>
      <div className={css.table}>
        <div className={css.tableHead}>
          <div className="flex-1">Site Name</div>
          <div className="flex-1">Domain</div>
          <div className="flex-1">Registered</div>
          <div className="min-w-14 text-center">Status</div>
        </div>

        {sites.map((site, index) => {
          const isActive = index === 0;
          const txnStatus = isActive ? "Active" : "Inactive";
          const txnColor = isActive ? css.active : css.inactive;

          return (
            <div
              key={site.id}
              className={`${css.tableRow} ${
                isActive &&
                "font-medium text-midnight-400! dark:text-vanilla-400!"
              }`}
            >
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
              <div className="flex-1 textxxs">
                {getFormattedDate(site.createdAt as Date)}
              </div>

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

export default memo(AccountSites);
