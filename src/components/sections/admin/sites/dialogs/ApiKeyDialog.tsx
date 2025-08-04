import { useCallback, useRef, useState } from "react";
import DialogFooter from "../../shared/dialog/DialogFooter";
import DialogHeader from "../../shared/dialog/DialogHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorCard from "@/components/shared/ErrorCard";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import { REGENERATE_API_KEY } from "@/constants/graphql/sites/new-site-api-key";
import { useAdminContext } from "@/context/admin/AdminContext";
import { usePathname } from "next/navigation";
import { GET_SITES_QUERY } from "@/constants/graphql/sites/get-all-sites.const";
import { GET_MY_SITES_QUERY } from "@/constants/graphql/sites/get-me-sites.const";
import { AlertMessageParams } from "@/context/admin/types/alert/alert-msg-params.interface";
import ApiKeyResponse from "../forms/ApiKeyResponse";

interface ApiKeyDialogProps {
  open: boolean;
  siteId: number;
  onClose: () => void;
}

export default function ApiKeyDialog({
  open,
  siteId,
  onClose,
}: ApiKeyDialogProps) {
  const { alertCtx } = useAdminContext();
  const { updateAlert } = alertCtx;

  const pathname = usePathname();
  const isAdminPage = pathname.includes("/allsites");

  const closingAttemptedRef = useRef(false);

  const [alertMsg, setAlertMsg] = useState<AlertMessageParams | null>(null);
  const [newKey, setNewKey] = useState<string | undefined>(undefined);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [showCopyWarning, setShowCopyWarning] = useState<boolean>(false);

  const queriesToRefetch = isAdminPage
    ? [GET_SITES_QUERY, "GetAllSites"]
    : [GET_MY_SITES_QUERY, "GetMySites"];

  const [regenerateApiKey, { loading, error }] = useMutation(
    REGENERATE_API_KEY,
    {
      refetchQueries: queriesToRefetch,
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const newData = data.regenerateApiKey;
        setNewKey(newData.site.apiKey);
        setAlertMsg({
          text: newData.message,
          severity: newData.status,
        });
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await regenerateApiKey({
      variables: { siteId: Number(siteId) },
    });
  };

  const handleCloseDialog = useCallback(
    (e?: React.MouseEvent | React.SyntheticEvent) => {
      if (e) e.preventDefault();
      if (alertMsg) updateAlert(alertMsg);

      if (newKey && !copiedKey) {
        if (!closingAttemptedRef.current) {
          closingAttemptedRef.current = true;
          setShowCopyWarning(true);
        } else {
          onClose();
          closingAttemptedRef.current = false;
        }
      } else {
        onClose();
        closingAttemptedRef.current = false;
      }
    },
    [alertMsg, onClose, updateAlert]
  );

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={() => handleCloseDialog()}
      aria-labelledby="regenerate-api-key-dialog-title"
    >
      <DialogTitle id="regenerate-api-key-dialog-title" sx={{ zIndex: 0 }}>
        <DialogHeader
          title={newKey ? "Next step ..." : "Regenerate API key"}
          onClose={handleCloseDialog}
        />
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "1rem!important" }}>
        {error && <ErrorCard mini error={error.message} />}
        {!newKey && (
          <Typography variant="body1">
            Are you sure you want to regenerate the API key?
          </Typography>
        )}
        {newKey && (
          <ApiKeyResponse
            apiKey={newKey}
            onResponse={() => setCopiedKey(true)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <DialogFooter
          loading={loading}
          btnSubmitTxt="Regenerate"
          onSubmit={!newKey ? handleSubmit : undefined}
        >
          {!newKey && (
            <ErrorCard
              mini
              color="warning"
              error="This action cannot be undone!"
              message="The old API key will be invalidated."
            />
          )}

          {showCopyWarning && (
            <ErrorCard
              mini
              color="warning"
              error="You haven't copied your key. If you leave, you cannot retrieve it in the future, and you must create a new key."
              message="Make sure to copy your key before leaving this page."
            />
          )}
        </DialogFooter>
      </DialogActions>
    </Dialog>
  );
}
