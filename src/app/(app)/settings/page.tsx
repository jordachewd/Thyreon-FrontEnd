import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import ToggleTheme from "@/components/shared/ToggleTheme";
import { Typography } from "@mui/material";

export default function AppSettings() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Settings" alignTitle="left" />
      <div className="flex w-full items-center">
        <Typography variant="body2" className="!mr-4">
          Toggle Theme Mode:
        </Typography>
        <ToggleTheme />
      </div>
    </PageWrapper>
  );
}
