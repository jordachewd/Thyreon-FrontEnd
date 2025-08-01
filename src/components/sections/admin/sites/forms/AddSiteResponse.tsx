import CopyTextField from "@/components/shared/CopyTextField";
import { Button, Typography } from "@mui/material";

type AddSiteResponseProps = {
  apiKey: string | undefined;
  onResponse?: () => void;
};

export default function AddSiteResponse({
  apiKey,
  onResponse,
}: AddSiteResponseProps) {
  const handleOnResponse = () => {
    if (onResponse) onResponse();
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Typography variant="h6">
        Next, install and activate the latest <b>WP Guard Client </b> plugin
        version.
      </Typography>

      <Button variant="outlined">Download WP Guard Client</Button>

      <Typography variant="body2">
        If the plugin is already installed on your WordPress site, copy and
        paste the unique API key into your plugin's settings page.
      </Typography>
      {apiKey && (
        <CopyTextField
          label="API Key"
          value={apiKey}
          doneCopied={handleOnResponse}
        />
      )}
    </div>
  );
}
