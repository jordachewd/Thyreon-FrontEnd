import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import ToggleTheme from "@/components/shared/ToggleTheme";
import { Alert, Typography } from "@mui/material";

export default function AppSettings() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Settings" alignTitle="left" />
      
      <Alert severity="info" variant="outlined">
        This page is not yet implemented. Settings functionality will be added
        in a future release.
      </Alert>

      <div className="flex flex-col w-full gap-6">
        <section className="flex w-full items-center">
          <Typography variant="h6" className="mr-4!" gutterBottom>
            Toggle Theme Mode:
          </Typography>
          <ToggleTheme />
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4!" gutterBottom>
            Account Preferences
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure your display name, email preferences, and account details.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4!" gutterBottom>
            Security & Authentication
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage two-factor authentication, password policies, and session
            settings.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4!" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Control email alerts, push notifications, and digest frequency for
            security events.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4!" gutterBottom>
            Integrations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connect webhooks, configure API keys, and integrate with external
            monitoring tools.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4!" gutterBottom>
            Data & Privacy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Set data retention policies, manage telemetry preferences, and
            configure privacy settings.
          </Typography>
        </section>
      </div>
    </PageWrapper>
  );
}
