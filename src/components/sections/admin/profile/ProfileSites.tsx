"use client";

import css from "@/styles/sections/admin/ProfileBilling.module.css";
import Typography from "@mui/material/Typography";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import ProfileWrapper from "./ProfileWrapper";
import Link from "next/link";
import { ProfileSitesType } from "@/types/profile/profile-sites.d";
import { SiteData } from "@/types/sites/site-data.d";
import { memo } from "react";
import { useAdminContext } from "@/context/admin/AdminContext";
import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";

function ProfileSites({
  data,
  title,
  alignTitle,
  titleSize,
}: ProfileSitesType) {
  const sites = data as SiteData[];

  const { data: currentUser } = useAdminContext().meCtx;
  const isAdmin = currentUser?.me?.role === "admin";
  const urlPrefix = isAdmin ? "/allsites" : "/mysites";

  if (!sites || sites.length === 0) {
    return (
      <ProfileWrapper
        title={title}
        alignTitle={alignTitle}
        titleSize={titleSize}
      >
        <Typography variant="body2" className="text-slate-600!">
          No sites yet.
        </Typography>
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper title={title} alignTitle={alignTitle} titleSize={titleSize}>
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
    </ProfileWrapper>
  );
}

export default memo(ProfileSites);
