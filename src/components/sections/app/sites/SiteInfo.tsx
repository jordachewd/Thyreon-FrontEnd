"use client";

import PageHead from "@/components/layout/common/PageHead";
import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { TooltipArrow } from "@/components/shared/TooltipArrow";
import { GET_SITE_BY_ID } from "@/constants/graphql/sites/get-site-by-id.const";
import { GetSiteData } from "@/types/sites/get-site-data.d";
import { useQuery } from "@apollo/client/react";
import { Alert, IconButton } from "@mui/material";
import { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import AdminAddNewFab from "../../admin/shared/AdminAddNewFab";

const ApiKeyDialog = dynamic(() => import("./dialogs/ApiKeyDialog"), { ssr: false });
const EditSiteDialog = dynamic(() => import("./dialogs/EditSiteDialog"), { ssr: false });

interface SiteInfoProps {
  siteId: number;
}

export default function SiteInfo({ siteId }: SiteInfoProps) {
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

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  return (
    <>
      <Suspense fallback={null}>
        <ApiKeyDialog
          open={!!newKeyForSite}
          siteData={newKeyForSite}
          onClose={() => setNewKeyForSite(undefined)}
        />
      </Suspense>

      <Suspense fallback={null}>
        <EditSiteDialog
          open={!!editSite}
          siteData={editSite}
          onClose={() => setEditSite(undefined)}
          refetchQuery={[GET_SITE_BY_ID, "GetSiteById"]}
        />
      </Suspense>

      <PageHead title="Site Info" alignTitle="left" size="h5">
        <div className="flex flex-1 justify-end items-center gap-4">
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

      <Alert severity="warning">
        This page is work in progress.
        <strong> Site management features are not yet implemented.</strong>
      </Alert>

      <div className="flex w-full gap-4 flex-col">
        <p>
          Here you can edit the site details, manage plugins, and view logs.
        </p>
        <p>
          In the future, you will be able to manage the site settings and
          perform actions like updating plugins or themes.
        </p>

        <p>
          Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
          blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
          aperiam ea perferendis iure. Sit deleniti iusto et galisum modi eos
          repellendus officiis et enim deserunt. Qui voluptate optio ab iusto
          sint est inventore officiis. Et enim mollitia sed ducimus consequatur
          qui veniam modi vel amet modi! Aut consequuntur omnis id accusantium
          obcaecati cum velit saepe qui dolores cupiditate hic blanditiis
          similique. Sed dolor libero sit omnis veniam sed repellat omnis eos
          nisi temporibus est laudantium internos. Hic voluptatem cumque ad odio
          impedit et quisquam accusamus. Ut eveniet officia id officia impedit
          qui consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
          accusamus molestiae quo explicabo ducimus.
        </p>
        <p>
          Qui voluptate optio ab iusto sint est inventore officiis. Et enim
          mollitia sed ducimus consequatur qui veniam modi vel amet modi! Aut
          consequuntur omnis id accusantium obcaecati cum velit saepe qui
          dolores cupiditate hic blanditiis similique. Sed dolor libero sit
          omnis veniam sed repellat omnis eos nisi temporibus est laudantium
          internos. Hic voluptatem cumque ad odio impedit et quisquam accusamus.
          Ut eveniet officia id officia impedit qui consequatur veritatis quo
          laboriosam sequi et rerum quibusdam ea accusamus molestiae quo
          explicabo ducimus. Lorem ipsum dolor sit amet. Ea itaque natus cum
          ipsam eveniet aut blanditiis quis 33 illum eaque a voluptatem
          cupiditate et excepturi aperiam ea perferendis iure. Sit deleniti
          iusto et galisum modi eos repellendus officiis et enim deserunt. Qui
          voluptate optio ab iusto sint est inventore officiis. Et enim mollitia
          sed ducimus consequatur qui veniam modi vel amet modi! Aut
          consequuntur omnis id accusantium obcaecati cum velit saepe qui
          dolores cupiditate hic blanditiis similique.
        </p>

        <p>
          Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
          temporibus est laudantium internos. Hic voluptatem cumque ad odio
          impedit et quisquam accusamus. Ut eveniet officia id officia impedit
          qui consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
          accusamus molestiae quo explicabo ducimus.
        </p>
      </div>
    </>
  );
}
