import PageWrapper from "@/components/layout/common/PageWrapper";
import Faqs from "@/components/sections/common/Faqs";
import Plans from "@/components/sections/common/Plans";

export default function PlansPage() {
  return (
    <PageWrapper className="gap-12 my-4">
      <Plans />
      <Faqs />
    </PageWrapper>
  );
}
