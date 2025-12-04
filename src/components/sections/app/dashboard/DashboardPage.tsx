import css from "@/styles/sections/dashboard/Grid.module.css";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import MuiBarChart from "../../admin/shared/charts/MuiBarChart";
import MuiLineChart from "../../admin/shared/charts/MuiLineChart";
import MuiPieChart from "../../admin/shared/charts/MuiPieChart";
import MuiScatterChart from "../../admin/shared/charts/MuiScatterChart";
import MuiSparkLineChart from "../../admin/shared/charts/MuiSparkLineChart";
import MuiHalfPieChart from "../../admin/shared/charts/MuiHalfPieChart";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className={css.grid}>
      <div className={classNames(css.cell, "lg:col-span-3")}>
        <Typography variant="h5">Welcome & Overview</Typography>
        <p>
          This dashboard is the first screen you see after login. It provides a
          concise summary of account status, monitored sites, and recent
          activity so administrators and users can quickly assess priorities.
        </p>

        <Suspense fallback={<LoadingBubbles />}>
          <MuiBarChart />
        </Suspense>
      </div>

      <div className={css.cell}>
        <Typography variant="h5">Security & Vulnerabilities</Typography>
        <p>
          Current security posture: active alerts, top detected vulnerabilities,
          and pending remediation tasks. Prioritize issues by severity to reduce
          risk quickly.
        </p>

        <MuiPieChart />
      </div>

      <div className={css.cell}>
        <Typography variant="h5">Sites & Health</Typography>
        <MuiSparkLineChart />
      </div>

      <div className={css.cell}>
        <Typography variant="h5">Integrations</Typography>
        <MuiSparkLineChart />
      </div>

      <div className={css.cell}>
        <Typography variant="h5">Traffic & Performance</Typography>
        <MuiSparkLineChart />
      </div>

      <div className={css.cell}>
        <Typography variant="h5">Scan History</Typography>
        <MuiSparkLineChart />
      </div>

      <div className={classNames(css.cell, "lg:col-span-2")}>
        <Typography variant="h5">Activity Summary</Typography>
        <p>
          Recent activity at a glance: total events in the last 24 hours, recent
          scans completed, and the number of changes detected across monitored
          sites.
        </p>
        <p>
          This summary helps you spot spikes or unexpected operations that may
          require further investigation.
        </p>

        <MuiLineChart />
      </div>

      <div className={classNames(css.cell, "lg:col-span-2")}>
        <Typography variant="h5">Attendance Report</Typography>
        <p>
          Most recent sign-ins and active sessions for admin and user accounts,
          including device and approximate location. Use this to detect unusual
          access and terminate suspicious sessions.
        </p>
        <MuiScatterChart />
      </div>

      <div className={classNames(css.cell, "lg:col-span-2")}>
        <div className="flex justify-between gap-8">
          <div className="flex-col flex gap-4 w-[60%]">
            <Typography variant="h5">Pending Tasks</Typography>
            <p>
              Open remediation tasks, untriaged alerts, and administrative items
              requiring attention. Use this as a personal or team action list.
            </p>
            <p>
              Tasks can be assigned to team members, marked as complete, or
              escalated for urgent attention.
            </p>
          </div>
          <div className="flex-1">
            <MuiHalfPieChart />
          </div>
        </div>
      </div>

      <div className={css.cell}>
        <Typography variant="h5">System Status & Notices</Typography>
        <p>
          Platform status, scheduled maintenance, and service notices. Check
          here first for announced interruptions that may affect monitoring.
        </p>
      </div>

      <div className={css.cell}>
        <Typography variant="h5">Alerts & Notifications</Typography>
        <p>
          Latest alerts with severity and timestamps. Acknowledge, mute, or
          investigate alerts directly from the dashboard to keep your incident
          list tidy.
        </p>
        <p>
          Notification channels and rules are summarized so you can confirm that
          critical alerts reach the right team members.
        </p>
      </div>
    </div>
  );
}
