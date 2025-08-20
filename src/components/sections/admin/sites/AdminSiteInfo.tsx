"use client";

import PageHead from "@/components/layout/common/PageHead";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GET_SITE_BY_ID } from "@/constants/graphql/sites/get-site-by-id.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";
import { Alert, Chip, IconButton } from "@mui/material";
import { useState, useCallback } from "react";
import AdminAddNewFab from "../shared/AdminAddNewFab";
import ApiKeyDialog from "./dialogs/ApiKeyDialog";
import EditSiteDialog from "./dialogs/EditSiteDialog";
import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";

interface AdminSiteInfoProps {
  siteId: number;
}

export default function AdminSiteInfo({ siteId }: AdminSiteInfoProps) {
  const { data, loading, error } = useQuery<{ siteById: GetSiteData }>(
    GET_SITE_BY_ID,
    {
      variables: { id: Number(siteId) },
    }
  );

  const siteData = data?.siteById as GetSiteData;

  const [newKeyForSite, setNewKeyForSite] = useState<
    Partial<GetSiteData> | undefined
  >(undefined);

  const [editSite, setEditSite] = useState<Partial<GetSiteData> | undefined>(
    undefined
  );

  const handleEditSite = useCallback(setEditSite, [setEditSite]);
  const handleNewApiKey = useCallback(setNewKeyForSite, []);

  if (loading) return <LoadingBubbles wrapped />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  const status = siteData.status;
  const statusColor = status === "active" ? "success" : "error";
  const chipColor = status === "revoked" ? "primary" : statusColor;

  return (
    <>
      <Alert severity="warning">
        This page is work in progress.
        <strong> Site management features are not yet implemented.</strong>
      </Alert>

      <ApiKeyDialog
        open={!!newKeyForSite}
        siteData={newKeyForSite}
        onClose={() => setNewKeyForSite(undefined)}
      />

      <EditSiteDialog
        open={!!editSite}
        siteData={editSite}
        onClose={() => setEditSite(undefined)}
        refetchQuery={[GET_SITE_BY_ID, "GetSiteById"]}
      />

      <PageHead
        title={siteData.siteName}
        titleLink={siteData.domain}
        alignTitle="left"
      >
        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Chip size="small" label={status} color={chipColor} />
            <ExternalLinkIcon
              href={`https://${siteData.domain}`}
              tooltip={`Go to ${siteData.domain}`}
              rel="noopener noreferrer"
              target="_blank"
            />
          </div>
          <div className="flex items-center gap-4">
            <TooltipArrow title="Get New API Key" placement="bottom">
              <IconButton
                sx={{ p: 0.5, backgroundColor: "transparent!important" }}
                onClick={() =>
                  handleNewApiKey({
                    id: siteData.id,
                    domain: siteData.domain,
                  })
                }
              >
                <i className="bi bi-key text-base rotate-90"></i>
              </IconButton>
            </TooltipArrow>
            <AdminAddNewFab
              icon="bi-pen"
              tooltipTitle="Edit Details"
              tooltipPlacement="bottom"
              execFn={() =>
                handleEditSite({
                  id: siteData.id,
                  siteName: siteData.siteName,
                  domain: siteData.domain,
                })
              }
            />
          </div>
        </div>
      </PageHead>

      <div className="flex w-full gap-4 flex-col p-4 bg-amber-300">
        Overview | Info | Health | Reports | Backups | Security | Updates |
        Settings
      </div>

      <div className="flex w-full gap-4 flex-col">
        <p>
          Here you can edit the site details, manage plugins, and view logs.
        </p>
        <p>
          In the future, you will be able to manage the site settings and
          perform actions like updating plugins or themes.
        </p>
        <p>#inprogress </p>
      </div>
    </>
  );
}
