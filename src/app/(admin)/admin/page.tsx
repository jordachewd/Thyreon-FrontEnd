import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import { Typography } from "@mui/material";
import classNames from "classnames";

export default function AdminSectionOverview() {
  const gridCss = "grid grid-cols-4 gap-6";
  const cellBase = "flex flex-col p-8 rounded gap-4 border";
  const cellBg = "bg-vanilla-100 dark:bg-midnight-800";
  const cellBorder = "border-vanilla-200 dark:border-midnight-600";
  const cellCss = classNames(cellBase, cellBg, cellBorder);

  return (
    <PageWrapper className="gap-8">
      <PageHead title="Admin Overview" alignTitle="left" />
      <div className={gridCss}>
        <div className={cellCss}>
          <Typography variant="h6">Application Status</Typography>
          <p>
            Current system status, active deployment version and recent deploy
            timestamp. Use this to confirm the app is running and the latest
            build is live.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">Active Users (24h)</Typography>
          <p>
            Number of unique users who interacted with the platform in the last
            24 hours and short-term trend (increasing / decreasing).
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">Registered Sites</Typography>
          <p>
            Total sites connected to WPGuard, plus pending approvals and recent
            site onboarding activity.
          </p>
        </div>

        <div className={`${cellCss} row-span-2`}>
          <Typography variant="h6">Traffic Overview</Typography>
          <p>
            Recent traffic patterns: pageviews, peak hours and geographic
            distribution to help identify load and user behaviour.
          </p>
          <p>
            Includes brief signals for spikes, bot activity or referral
            anomalies.
          </p>
        </div>

        <div className={`${cellCss} row-span-2 col-span-3`}>
          <Typography variant="h6">Transactions & Billing</Typography>
          <p>
            Summary of processed transactions, payment success rate and total
            value for the selected period. Useful for spotting billing issues.
          </p>
          <p>
            Also highlights failed payments, chargebacks and pending invoices
            requiring attention.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">Monthly Revenue</Typography>
          <p>
            Recurring revenue metrics (MRR/ARR), month-over-month change and top
            contributors to revenue growth.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">Security Alerts</Typography>
          <p>
            Count and severity of recent security events, critical alerts and
            recommended actions for incidents that need immediate review.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">Storage & Bandwidth</Typography>
          <p>
            Current storage usage and bandwidth consumption versus limits, with
            alerts for approaching quotas.
          </p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">System Health</Typography>
          <p>
            Health indicators for core services (API, database, workers), uptime
            percentages and recent error rates to monitor infrastructure
            stability.
          </p>
          <p>Quick links to logs and diagnostics for deeper investigation.</p>
        </div>

        <div className={cellCss}>
          <Typography variant="h6">User Growth (30d)</Typography>
          <p>
            Signups, churn and percentage change over the last 30 days to track
            adoption and retention trends.
          </p>
        </div>

        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h6">Integrations & API</Typography>
          <p>
            Top used integrations, recent API calls and rate-limit status. Use
            this to spot integration failures or unusually high API usage.
          </p>
        </div>

        <div className={`${cellCss} col-span-2`}>
          <Typography variant="h6">Support & Tasks</Typography>
          <p>
            Open support tickets, critical customer issues and outstanding admin
            tasks that require follow-up to maintain SLA and customer
            satisfaction.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
