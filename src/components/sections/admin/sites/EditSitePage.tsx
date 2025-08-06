"use client";

import PageHead from "@/components/layout/common/PageHead";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GET_SITE_BY_ID } from "@/constants/graphql/sites/get-site-by-id.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import AdminAddNewFab from "../shared/AdminAddNewFab";
import ExternalLinkIcon from "@/components/layout/common/ExternalLinkIcon";
import { useCallback, useState } from "react";
import ApiKeyDialog from "./dialogs/ApiKeyDialog";

interface EditSiteProps {
  siteId: number;
}

export default function EditSitePage({ siteId }: EditSiteProps) {
  const { data, loading, error } = useQuery<{ siteById: GetSiteData }>(
    GET_SITE_BY_ID,
    {
      variables: { id: Number(siteId) },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  const siteData = data?.siteById as GetSiteData;
  const [newKeyForSite, setNewKeyForSite] = useState<
    Partial<GetSiteData> | undefined
  >(undefined);

  const handleNewApiKey = useCallback(setNewKeyForSite, []);

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  return (
    <>
      <ApiKeyDialog
        open={!!newKeyForSite}
        siteData={newKeyForSite}
        onClose={() => setNewKeyForSite(undefined)}
      />

      <PageHead
        title={siteData.siteName}
        titleLink={siteData.domain}
        alignTitle="left"
      >
        <div className="flex flex-1 justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Chip size="small" label="Disconnected" color="error" />
            <ExternalLinkIcon
              href={`https://${siteData.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              tooltip={`Go to ${siteData.domain}`}
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
              execFn={() => console.log("Edit Site")}
            />
          </div>
        </div>
      </PageHead>

      <div className="flex flex-col w-full gap-1 !py-8">
        <p className="text-sm text-gray-500">
          <b>Site ID:</b> {siteData.id}
        </p>
        <p className="text-sm text-gray-500">
          <b>Site Name:</b> {siteData.siteName}
        </p>
        <p className="text-sm text-gray-500">
          <b>Domain:</b> {siteData.domain}
        </p>
        <p className="text-sm text-gray-500">
          <b>Api Key (hashed):</b> {siteData.apiKey}
        </p>
        <p className="text-sm text-gray-500">
          <b>Created At:</b> {new Date(siteData.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          <b>Last Seen:</b> {new Date(siteData.lastSeen).toLocaleString()}
        </p>
        <br />
        <br />
        <br />
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
