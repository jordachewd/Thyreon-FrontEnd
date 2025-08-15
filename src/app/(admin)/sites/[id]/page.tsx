import PageWrapper from "@/components/layout/common/PageWrapper";
import { Typography } from "@mui/material";
import classNames from "classnames";

export default async function SitePage() {
  const gridCss = "grid grid-cols-4 gap-6";
  const cellBase = "flex flex-col p-8 rounded gap-4 border";
  const cellBg = "bg-vanilla-100 dark:bg-midnight-800";
  const cellBorder = "border-vanilla-200 dark:border-midnight-600";
  const cellCss = classNames(cellBase, cellBg, cellBorder);

  return (
    <PageWrapper>
      <div className={gridCss}>
        <div className={cellCss}>
          <Typography variant="h6">Security Status</Typography>
          <p>
            Displays the current security health of your website, including
            active protections, detected threats, and recommended actions to
            keep your site safe.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Latest Updates (needed)</Typography>
          <p>
            Shows pending updates for plugins, themes, and WordPress core.
            Keeping your site updated helps prevent vulnerabilities.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Backups</Typography>
          <p>
            Displays the status and schedule of your website backups, ensuring
            you can restore your site in case of data loss or attacks.
          </p>
        </div>
        <div className={`${cellCss} row-span-2`}>
          <Typography variant="h6">Site Health</Typography>
          <p>
            Provides an overview of your site's technical health, including
            performance, configuration, and security recommendations.
          </p>
          <p>
            Review issues and suggestions to maintain optimal site operation and
            security.
          </p>
        </div>
        <div className={`${cellCss} row-span-2 col-span-3`}>
          <Typography variant="h6">Reports (Logs)</Typography>
          <p>
            Access detailed logs of security events, user activity, and system
            changes to monitor and audit your website.
          </p>
          <p>
            Use these reports to investigate incidents and track ongoing
            security trends.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Blocked Threats</Typography>
          <p>
            Displays a key metric or statistic relevant to your site's security
            or performance.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Recent Login Attempts</Typography>
          <p>
            Shows another important site metric, such as recent login attempts
            or blocked threats.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Uptime Percentage</Typography>
          <p>
            Highlights a specific statistic, like uptime percentage or number of
            updates applied.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Recent Alerts</Typography>
          <p>
            Presents a summary of recent changes or alerts affecting your
            website.
          </p>
        </div>
        <div className={cellCss}>
          <Typography variant="h6">Update Summary</Typography>
          <p>
            Displays a quick overview of another relevant site metric or status.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
