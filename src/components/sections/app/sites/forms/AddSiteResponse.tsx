import CopyTextField from "@/components/shared/CopyTextField";
import { Button, Typography } from "@mui/material";
import { memo, useCallback } from "react";

type AddSiteResponseProps = {
  apiKey: string | undefined;
  onResponse?: () => void;
};

function AddSiteResponse({ apiKey, onResponse }: AddSiteResponseProps) {
  const handleOnResponse = useCallback(() => {
    onResponse?.();
  }, [onResponse]);

  return (
    <div className="flex flex-col w-full gap-4">
      <Typography variant="h6">
        Install and activate the latest <b>Thyreon WP Client</b> plugin version.
      </Typography>

      <Button variant="outlined">Download Thyreon WP Client</Button>

      <Typography variant="body2" className="my-4!">
        If the plugin is already installed on your WordPress website, copy and
        paste the below API key into your plugin's settings page.
      </Typography>

      {apiKey && (
        <CopyTextField
          label="API Key"
          value={apiKey}
          info="Copy this API key and paste it into the Thyreon WP Client plugin settings."
          doneCopied={handleOnResponse}
        />
      )}
    </div>
  );
}

export default memo(AddSiteResponse);
