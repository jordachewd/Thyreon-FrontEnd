import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import TransactionsPage from "@/components/sections/admin/transactions/TransactionsPage";

export const dynamic = "force-dynamic";

export default function AdminTransactionsPage() {
  return (
    <PageWrapper className="gap-8">
      <PageHead title="All Transactions" alignTitle="left" />
      <TransactionsPage />
    </PageWrapper>
  );
}
