import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import Alert from "@mui/material/Alert";

export default function SiteUpdatesPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="Updates" alignTitle="left" size="h5" />
      <Alert severity="warning">
        This page is work in progress.
        <strong> Update features are not yet implemented.</strong>
      </Alert>

      <p>
        Lorem ipsum dolor sit amet. Ea itaque natus cum ipsam eveniet aut
        blanditiis quis 33 illum eaque a voluptatem cupiditate et excepturi
        aperiam ea perferendis iure.
      </p>
    </PageWrapper>
  );
}
