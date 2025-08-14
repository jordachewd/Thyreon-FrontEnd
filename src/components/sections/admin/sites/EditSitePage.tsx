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
import Typography from "@mui/material/Typography";
import EditSiteDialog from "./dialogs/EditSiteDialog";

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

  const [editSite, setEditSite] = useState<Partial<GetSiteData> | undefined>(
    undefined
  );

  const handleEditSite = useCallback(setEditSite, [setEditSite]);
  const handleNewApiKey = useCallback(setNewKeyForSite, []);

  if (loading) return <LoadingBubbles wrapped fullHeight />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

  const status = siteData.status;
  const statusColor = status === "active" ? "success" : "error";
  const chipColor = status === "revoked" ? "primary" : statusColor;

  return (
    <>
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
        <div className="flex flex-1 justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Chip size="small" label={status} color={chipColor} />
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

      <div className="flex w-full gap-8 !mt-4">
        <div className="flex flex-col w-1/6 bg-vanilla-200 gap-2">
          <Typography variant="h6" className="!mb-4">
            Navigation
          </Typography>
          <p>Overview</p>
          <p>Site Info (Wordpress)</p>
          <p>Health Status (Wordpress)</p>
          <p>Reports (Logs)</p>
          <p>Backups</p>
          <p>Updates</p>
          <p>Security</p>
          <p>Settings</p>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <p>
            Here you can edit the site details, manage plugins, and view logs.
          </p>
          <p>
            In the future, you will be able to manage the site settings and
            perform actions like updating plugins or themes.
          </p>
          <p>#inprogress </p>
          <br /> <br />
          <p>
            Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
            blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
            aperiam ea perferendis iure. Sit deleniti iusto et galisum modi eos
            repellendus officiis et enim deserunt. Qui voluptate optio ab iusto
            sint est inventore officiis. Et enim mollitia sed ducimus
            consequatur qui veniam modi vel amet modi! Aut consequuntur omnis id
            accusantium obcaecati cum velit saepe qui dolores cupiditate hic
            blanditiis similique. Sed dolor libero sit omnis veniam sed repellat
            omnis eos nisi temporibus est laudantium internos. Hic voluptatem
            cumque ad odio impedit et quisquam accusamus. Ut eveniet officia id
            officia impedit qui consequatur veritatis quo laboriosam sequi et
            rerum quibusdam ea accusamus molestiae quo explicabo ducimus.
          </p>
          <p>
            Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
            temporibus est laudantium internos. Hic voluptatem cumque ad odio
            impedit et quisquam accusamus. Ut eveniet officia id officia impedit
            qui consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
            accusamus molestiae quo explicabo ducimus. Lorem ipsum dolor sit
            amet. Ea itaque natus cum ipsam eveniet aut blanditiis quis 33 illum
            eaque a voluptatem cupiditate et excepturi aperiam ea perferendis
            iure. Sit deleniti iusto et galisum modi eos repellendus officiis et
            enim deserunt. Qui voluptate optio ab iusto sint est inventore
            officiis. Et enim mollitia sed ducimus consequatur qui veniam modi
            vel amet modi! Aut consequuntur omnis id accusantium obcaecati cum
            velit saepe qui dolores cupiditate hic blanditiis similique. Sed
            dolor libero sit omnis veniam sed repellat omnis eos nisi temporibus
            est laudantium internos. Hic voluptatem cumque ad odio impedit et
            quisquam accusamus. Ut eveniet officia id officia impedit qui
            consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
            accusamus molestiae quo explicabo ducimus. Lorem ipsum dolor sit
            amet. Ea itaque natus cum ipsam eveniet aut blanditiis quis 33 illum
            eaque a voluptatem cupiditate et excepturi aperiam ea perferendis
            iure. Sit deleniti iusto et galisum modi eos repellendus officiis et
            enim deserunt.
          </p>
          <p>
            Qui voluptate optio ab iusto sint est inventore officiis. Et enim
            mollitia sed ducimus consequatur qui veniam modi vel amet modi! Aut
            consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos. Hic voluptatem cumque ad odio impedit et quisquam
            accusamus. Ut eveniet officia id officia impedit qui consequatur
            veritatis quo laboriosam sequi et rerum quibusdam ea accusamus
            molestiae quo explicabo ducimus. Lorem ipsum dolor sit amet. Ea
            itaque natus cum ipsam eveniet aut blanditiis quis 33 illum eaque a
            voluptatem cupiditate et excepturi aperiam ea perferendis iure. Sit
            deleniti iusto et galisum modi eos repellendus officiis et enim
            deserunt. Qui voluptate optio ab iusto sint est inventore officiis.
            Et enim mollitia sed ducimus consequatur qui veniam modi vel amet
            modi! Aut consequuntur omnis id accusantium obcaecati cum velit
            saepe qui dolores cupiditate hic blanditiis similique.
          </p>
          <br />
          <p>
            Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
            temporibus est laudantium internos. Hic voluptatem cumque ad odio
            impedit et quisquam accusamus. Ut eveniet officia id officia impedit
            qui consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
            accusamus molestiae quo explicabo ducimus. Lorem ipsum dolor sit
            amet. Ea itaque natus cum ipsam eveniet aut blanditiis quis 33 illum
            eaque a voluptatem cupiditate et excepturi aperiam ea perferendis
            iure. Sit deleniti iusto et galisum modi eos repellendus officiis et
            enim deserunt. Qui voluptate optio ab iusto sint est inventore
            officiis. Et enim mollitia sed ducimus consequatur qui veniam modi
            vel amet modi! Aut consequuntur omnis id accusantium obcaecati cum
            velit saepe qui dolores cupiditate hic blanditiis similique. Sed
            dolor libero sit omnis veniam sed repellat omnis eos nisi temporibus
            est laudantium internos. Hic voluptatem cumque ad odio impedit et
            quisquam accusamus. Ut eveniet officia id officia impedit qui
            consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
            accusamus molestiae quo explicabo ducimus. Lorem ipsum dolor sit
            amet. Ea itaque natus cum ipsam eveniet aut blanditiis quis 33 illum
            eaque a voluptatem cupiditate et excepturi aperiam ea perferendis
            iure. Sit deleniti iusto et galisum modi eos repellendus officiis et
            enim deserunt.
          </p>
          <br />
          <p>
            Qui voluptate optio ab iusto sint est inventore officiis. Et enim
            mollitia sed ducimus consequatur qui veniam modi vel amet modi! Aut
            consequuntur omnis id accusantium obcaecati cum velit saepe qui
            dolores cupiditate hic blanditiis similique. Sed dolor libero sit
            omnis veniam sed repellat omnis eos nisi temporibus est laudantium
            internos. Hic voluptatem cumque ad odio impedit et quisquam
            accusamus. Ut eveniet officia id officia impedit qui consequatur
            veritatis quo laboriosam sequi et rerum quibusdam ea accusamus
            molestiae quo explicabo ducimus. Lorem ipsum dolor sit amet. Ea
            itaque natus cum ipsam eveniet aut blanditiis quis 33 illum eaque a
            voluptatem cupiditate et excepturi aperiam ea perferendis iure. Sit
            deleniti iusto et galisum modi eos repellendus officiis et enim
            deserunt. Qui voluptate optio ab iusto sint est inventore officiis.
            Et enim mollitia sed ducimus consequatur qui veniam modi vel amet
            modi! Aut consequuntur omnis id accusantium obcaecati cum velit
            saepe qui dolores cupiditate hic blanditiis similique.
          </p>
          <br />
          <p>
            Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
            temporibus est laudantium internos. Hic voluptatem cumque ad odio
            impedit et quisquam accusamus. Ut eveniet officia id officia impedit
            qui consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
            accusamus molestiae quo explicabo ducimus. Lorem ipsum dolor sit
            amet. Ea itaque natus cum ipsam eveniet aut blanditiis quis 33 illum
            eaque a voluptatem cupiditate et excepturi aperiam ea perferendis
            iure. Sit deleniti iusto et galisum modi eos repellendus officiis et
            enim deserunt. Qui voluptate optio ab iusto sint est inventore
            officiis. Et enim mollitia sed ducimus consequatur qui veniam modi
            vel amet modi! Aut consequuntur omnis id accusantium obcaecati cum
            velit saepe qui dolores cupiditate hic blanditiis similique.
          </p>
          <br />
          <p>
            Sed dolor libero sit omnis veniam sed repellat omnis eos nisi
            temporibus est laudantium internos. Hic voluptatem cumque ad odio
            impedit et quisquam accusamus. Ut eveniet officia id officia impedit
            qui consequatur veritatis quo laboriosam sequi et rerum quibusdam ea
            accusamus molestiae quo explicabo ducimus.
          </p>
        </div>
      </div>
    </>
  );
}
