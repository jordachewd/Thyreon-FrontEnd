"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import {
  DELETE_SITES,
  DeleteSitesMutationResponse,
} from "@/constants/graphql/sites/delete-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { useAdminUi } from "@/context/AdminUiContext";
import { useMutation } from "@apollo/client/react";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";

interface DeleteSiteBtnProps {
  sites: Set<string | number> | undefined;
  disabled?: boolean;
  onSuccess?: () => void;
}

export default function DeleteSiteBtn({
  sites,
  disabled = false,
  onSuccess,
}: DeleteSiteBtnProps) {
  const pathname = usePathname();
  const { alertCtx } = useAdminUi();
  const { updateAlert } = alertCtx;

  const isAdminPage = pathname.includes("/allsites");

  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const [deleteSites, { loading, error, reset }] = useMutation(DELETE_SITES, {
    refetchQueries: queriesToRefetch,
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const { deleteSites } = data as DeleteSitesMutationResponse;

      updateAlert({
        text: deleteSites.message,
        severity: deleteSites.status,
      });

      if (onSuccess) onSuccess();
    },
  });

  const oneOrMany = sites?.size === 1 ? "site" : "sites";

  const handleDelete = async () => {
    const introMsg = "Are you sure you want to delete";
    const endMsg = "\nThis action cannot be undone.";
    const confirmMsg = `${introMsg} ${sites?.size} ${oneOrMany}?`;

    if (!confirm(confirmMsg + endMsg)) return;

    const siteIds = sites ? Array.from(sites).map((site) => Number(site)) : [];

    await deleteSites({
      variables: { ids: siteIds },
    });
  };

  return (
    <>
      {error ? (
        <ErrorCard mini error={error.message} onCloseMini={reset} />
      ) : (
        <Button
          size="small"
          color="error"
          variant="outlined"
          disabled={disabled || loading}
          onClick={handleDelete}
          sx={{
            fontSize: "0.675rem",
            color: "error.main",
            borderColor: "error.main",
            backgroundColor: "transparent",
          }}
        >
          {loading ? "Deleting ..." : `Delete ${oneOrMany}`}
        </Button>
      )}
    </>
  );
}
