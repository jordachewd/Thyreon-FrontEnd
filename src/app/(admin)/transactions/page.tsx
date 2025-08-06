import PageHead from "@/components/layout/common/PageHead";
import TransactionsPage from "@/components/sections/admin/transactions/TransactionsPage";

export default async function AdminTransactions() {
  return (
    <>
      <PageHead title="Transactions" alignTitle="left" />
      <TransactionsPage />
    </>
  );
}
