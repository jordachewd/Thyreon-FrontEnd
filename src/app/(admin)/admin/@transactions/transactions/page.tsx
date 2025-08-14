import PageHead from "@/components/layout/common/PageHead";
import TransactionsPage from "@/components/sections/admin/transactions/TransactionsPage";

export default function AdminTransactionsPage() {
  return (
    <>
      <PageHead title="Transactions" alignTitle="left" />
      <TransactionsPage />
    </>
  );
}
