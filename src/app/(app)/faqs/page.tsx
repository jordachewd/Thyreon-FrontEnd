import PageWrapper from "@/components/layout/common/PageWrapper";
import Faqs from "@/components/sections/common/Faqs";

export const dynamic = "force-dynamic";

export default function AppFaqs() {
  return (
    <PageWrapper className="gap-12 my-4">
      <Faqs />
    </PageWrapper>
  );
}
