import PageWrapper from "@/components/layout/common/PageWrapper";
import Plans from "@/components/sections/common/Plans";
import getUserPlan from "@/lib/actions/users/get-user-plan";

export const dynamic = "force-dynamic";

export default async function AppPlans() {
  const planData = await getUserPlan();

  return (
    <PageWrapper className="gap-12 my-4">
      <Plans currentPlan={planData.currentPlan} error={planData.error} />
    </PageWrapper>
  );
}
