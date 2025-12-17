"use client";

import { useEffect, useState } from "react";
import ErrorCard from "@/components/shared/ErrorCard";
import { transactionsTableColumns as columns } from "@/constants/table/columns/transactions-table-columns";
import { DataGrid } from "@/components/ui";
import { TransactionType } from "@/types/transactions/transaction.d";
import { getTransactions } from "@/lib/actions/transactions/get-transactions";

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getTransactions();
      
      if (result.success) {
        setTransactions(result.transactions);
        setError(null);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, []);

  if (error) return <ErrorCard error={error} />;

  return (
    <div className="flex w-full">
      <DataGrid
        loading={loading}
        rows={transactions}
        columns={columns}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
    </div>
  );
}
