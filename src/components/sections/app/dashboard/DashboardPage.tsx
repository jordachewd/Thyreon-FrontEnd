"use client";

import { Typography } from "@/components/ui";
import { BarChart, LineChart, PieChart, SparkLine } from "@/components/ui/charts";
import classNames from "classnames";

// Demo data for charts
const barData = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 19 },
  { label: "Wed", value: 15 },
  { label: "Thu", value: 25 },
  { label: "Fri", value: 22 },
  { label: "Sat", value: 18 },
  { label: "Sun", value: 14 },
];

const lineData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 110 },
];

const pieData = [
  { label: "Critical", value: 5, color: "#ef4444" },
  { label: "High", value: 12, color: "#f59e0b" },
  { label: "Medium", value: 23, color: "#eab308" },
  { label: "Low", value: 45, color: "#10b981" },
];

const sparkData = [12, 19, 15, 25, 22, 30, 28, 35, 32, 38, 42, 45, 40, 48, 52];

export default function DashboardPage() {
  return (
    <div className="dashboard-grid">
      <div className={classNames("dashboard-grid-cell", "lg:col-span-3")}>
        <Typography variant="h5">Welcome & Overview</Typography>
        <p>
          This dashboard is the first screen you see after login. It provides a
          concise summary of account status, monitored sites, and recent
          activity so administrators and users can quickly assess priorities.
        </p>

        <BarChart data={barData} height={250} />
      </div>

      <div className="dashboard-grid-cell">
        <Typography variant="h5">Security & Vulnerabilities</Typography>
        <p>
          Current security posture: active alerts, top detected vulnerabilities,
          and pending remediation tasks. Prioritize issues by severity to reduce
          risk quickly.
        </p>

        <PieChart data={pieData} height={250} />
      </div>

      <div className="dashboard-grid-cell">
        <Typography variant="h5">Sites & Health</Typography>
        <SparkLine data={sparkData} height={80} label="Active Sites" value="24" />
      </div>

      <div className="dashboard-grid-cell">
        <Typography variant="h5">Integrations</Typography>
        <SparkLine data={sparkData} height={80} label="API Calls" value="1.2K" color="#8b5cf6" />
      </div>

      <div className="dashboard-grid-cell">
        <Typography variant="h5">Traffic & Performance</Typography>
        <SparkLine data={sparkData} height={80} label="Avg Response" value="180ms" color="#10b981" />
      </div>

      <div className="dashboard-grid-cell">
        <Typography variant="h5">Scan History</Typography>
        <SparkLine data={sparkData} height={80} label="Scans Today" value="48" color="#f59e0b" />
      </div>

      <div className={classNames("dashboard-grid-cell", "lg:col-span-2")}>
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

        <LineChart data={lineData} height={250} />
      </div>

      <div className={classNames("dashboard-grid-cell", "lg:col-span-2")}>
        <Typography variant="h5">Attendance Report</Typography>
        <p>
          Most recent sign-ins and active sessions for admin and user accounts,
          including device and approximate location. Use this to detect unusual
          access and terminate suspicious sessions.
        </p>
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900 rounded-lg">
          Scatter Chart - Demo Placeholder
        </div>
      </div>

      <div className={classNames("dashboard-grid-cell", "lg:col-span-2")}>
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
          <div className="flex-1 flex items-center justify-center">
            <PieChart
              data={[
                { label: "Pending", value: 12, color: "#f59e0b" },
                { label: "Complete", value: 28, color: "#10b981" },
              ]}
              height={200}
            />
          </div>
        </div>
      </div>

      <div className="dashboard-grid-cell">
        <Typography variant="h5">System Status & Notices</Typography>
        <p>
          Platform status, scheduled maintenance, and service notices. Check
          here first for announced interruptions that may affect monitoring.
        </p>
      </div>

      <div className="dashboard-grid-cell">
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
