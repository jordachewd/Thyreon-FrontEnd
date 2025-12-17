import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import { Alert } from "@/components/ui";

export default function SiteSettingsPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Settings" alignTitle="left" size="h5" />
      <Alert severity="warning">
        This page is work in progress.
        <strong> Settings features are not yet implemented.</strong>
      </Alert>

      <p>
        Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
        blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
        aperiam ea perferendis iure.
      </p>
    </PageWrapper>
  );
}
