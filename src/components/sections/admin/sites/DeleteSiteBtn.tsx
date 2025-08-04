"use client";

import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useAdminContext } from "@/context/admin/AdminContext";
import { DELETE_SITES } from "@/constants/graphql/sites/delete-sites.const";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import ErrorCard from "@/components/shared/ErrorCard";

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
  const isAdminPage = pathname.includes("/allsites");
  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const [deleteSites, { loading, error }] = useMutation(DELETE_SITES, {
    refetchQueries: queriesToRefetch,
    awaitRefetchQueries: true,
  });

  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const oneOrMany = sites?.size === 1 ? "site" : "sites";

  const handleDelete = async () => {
    const confirmMsg = `Are you sure you want to delete ${sites?.size} ${oneOrMany}?`;
    if (!confirm(confirmMsg + `\nThis action cannot be undone.`)) return;

    try {
      const siteIds = sites
        ? Array.from(sites).map((site) => Number(site))
        : [];

      await deleteSites({
        variables: { siteIds: siteIds },
        onCompleted: (data) => {
          const response = data?.deleteSites;

          updateAlert({
            text: response.message,
            severity: response.status,
          });

          if (onSuccess) onSuccess();
        },
      });
    } catch (error: unknown) {
      const defaultMsg = "An error occurred while deleting sites.";
      const errorMessage = (error as Error).message || defaultMsg;
      console.log(errorMessage);
    }
  };

  return (
    <>
      {error ? (
        <ErrorCard mini error={error.message} />
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
