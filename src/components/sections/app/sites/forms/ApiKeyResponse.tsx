import CopyTextField from "@/components/shared/CopyTextField";
import Typography from "@mui/material/Typography";
import { memo, useCallback } from "react";

type AddSiteResponseProps = {
  apiKey: string | undefined;
  onResponse?: () => void;
};

function ApiKeyResponse({ apiKey, onResponse }: AddSiteResponseProps) {
  const handleOnResponse = useCallback(() => {
    onResponse?.();
  }, [onResponse]);

  return (
    <div className="flex flex-col w-full gap-4">
      <Typography variant="h6">
        Update the API key in the <b>Thyreon WP Client</b> plugin settings on your website.
      </Typography>

      {apiKey && (
        <CopyTextField
          label="API Key"
          value={apiKey}
          info="Copy this API key and paste it into plugin settings."
          doneCopied={handleOnResponse}
        />
      )}
    </div>
  );
}

export default memo(ApiKeyResponse);
