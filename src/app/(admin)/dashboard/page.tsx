import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";

import Typography from "@mui/material/Typography";
import classNames from "classnames";

export default async function AdminDashboard() {
  const gridCss = "grid grid-cols-4 gap-6";
  const cellBase = "flex flex-col p-8 rounded gap-4 border";
  const cellBg = "bg-vanilla-100 dark:bg-midnight-800";
  const cellBorder = "border-vanilla-200 dark:border-midnight-600";
  const cellCss = classNames(cellBase, cellBg, cellBorder);

  return (
    <PageWrapper className="gap-8">
      <PageHead title="Dashboard" alignTitle="left" />

      <div className={gridCss}>
        <div className={cellCss}>
          <Typography variant="h5">Welcome & Overview</Typography>
          <p>
            This dashboard is the first screen you see after login. It provides
            a concise summary of account status, monitored sites, and recent
            activity so administrators and users can quickly assess priorities.
          </p>
          <p>
            Use the boxes below to drill into health status, security alerts,
            recent logins, subscription info, and quick remediation actions.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h5">Activity Summary</Typography>
          <p>
            Recent activity at a glance: total events in the last 24 hours,
            recent scans completed, and the number of changes detected across
            monitored sites.
          </p>
          <p>
            This summary helps you spot spikes or unexpected operations that may
            require further investigation.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h5">Sites & Health</Typography>
          <p>
            High-level site metrics including total sites monitored, sites with
            warnings, and sites in critical state. Click through to see per-site
            health checks and uptime history.
          </p>
        </div>

        <div className={`${cellCss} row-span-2`}>
          <Typography variant="h5">Security & Vulnerabilities</Typography>
          <p>
            Current security posture: active alerts, top detected
            vulnerabilities, and pending remediation tasks. Prioritize issues by
            severity to reduce risk quickly.
          </p>
          <p>
            Each finding links to recommended fixes and the affected site
            details.
          </p>
        </div>

        <div className={`${cellCss} row-span-2 col-span-3`}>
          <Typography variant="h5">Alerts & Notifications</Typography>
          <p>
            Latest alerts with severity and timestamps. Acknowledge, mute, or
            investigate alerts directly from the dashboard to keep your incident
            list tidy.
          </p>
          <p>
            Notification channels and rules are summarized so you can confirm
            that critical alerts reach the right team members.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h5">Recent Logins & Sessions</Typography>
          <p>
            Most recent sign-ins and active sessions for admin and user
            accounts, including device and approximate location. Use this to
            detect unusual access and terminate suspicious sessions.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h5">Traffic & Performance</Typography>
          <p>
            Quick metrics on recent traffic, average response times, and error
            rates. Identify sites experiencing load issues or increased latency.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h5">Scan History</Typography>
          <p>
            Recent scan results with counts of findings per scan. See when the
            last full and incremental scans ran and which scans require review.
          </p>
        </div>

        <div className={`${cellCss} row-span-2 col-span-2`}>
          <Typography variant="h5">Account & Subscription</Typography>
          <p>
            Billing status, plan limits, and upcoming renewals. Monitor usage
            against plan quotas to avoid service disruptions.
          </p>
          <p>
            Quick link to update billing details or upgrade the plan when
            needed.
          </p>
        </div>

        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h5">Integrations</Typography>
          <p>
            Status of connected integrations (e.g., Slack, email, ticketing).
            Confirm that notifications and automated actions are flowing as
            expected.
          </p>
        </div>

        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h5">Pending Tasks</Typography>
          <p>
            Open remediation tasks, untriaged alerts, and administrative items
            requiring attention. Use this as a personal or team action list.
          </p>
        </div>

        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h5">System Status & Notices</Typography>
          <p>
            Platform status, scheduled maintenance, and service notices. Check
            here first for announced interruptions that may affect monitoring.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
