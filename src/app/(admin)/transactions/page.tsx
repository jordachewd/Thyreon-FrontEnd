import PageHead from "@/components/layout/common/PageHead";
import TransactionsTable from "@/components/sections/admin/transactions/TransactionsTable";

export default async function AdminTransactions() {
  return (
    <>
      <PageHead title="Transactions" alignTitle="left" />
      <TransactionsTable />
    </>
  );
}
