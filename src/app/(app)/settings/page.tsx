import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import ToggleTheme from "@/components/shared/ToggleTheme";
import { Alert, Typography } from "@/components/ui";

export const dynamic = "force-dynamic";

export default function AppSettings() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Settings" alignTitle="left" />
      
      <Alert severity="info">
        This page is not yet implemented. Settings functionality will be added
        in a future release.
      </Alert>

      <div className="flex flex-col w-full gap-6">
        <section className="flex w-full items-center">
          <Typography variant="h6" className="mr-4 mb-2">
            Toggle Theme Mode:
          </Typography>
          <ToggleTheme />
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4 mb-2">
            Account Preferences
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Configure your display name, email preferences, and account details.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4 mb-2">
            Security & Authentication
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Manage two-factor authentication, password policies, and session
            settings.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4 mb-2">
            Notifications
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Control email alerts, push notifications, and digest frequency for
            security events.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4 mb-2">
            Integrations
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Connect webhooks, configure API keys, and integrate with external
            monitoring tools.
          </Typography>
        </section>

        <section className="flex flex-col w-full">
          <Typography variant="h6" className="mr-4 mb-2">
            Data & Privacy
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Set data retention policies, manage telemetry preferences, and
            configure privacy settings.
          </Typography>
        </section>
      </div>
    </PageWrapper>
  );
}
