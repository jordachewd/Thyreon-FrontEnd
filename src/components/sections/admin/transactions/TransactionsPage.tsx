"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { Transaction } from "@/types/transactions/transaction.d";
import { transactionsTableColumns as columns } from "@/constants/table/columns/transactions-table-columns";
import { GET_TRANSACTIONS_QUERY } from "@/constants/graphql/transactions/get-transactions.const";
import { useQuery } from "@apollo/client";

export default function TransactionsPage() {
  const { data, loading, error } = useQuery<{ transactions: Transaction[] }>(
    GET_TRANSACTIONS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard error={error.message} />;

  const transactions: Transaction[] = data?.transactions || [];

  return (
    <div className="flex w-full">
      <DataGrid
        rows={transactions}
        columns={columns}
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnMenu
        pagination
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        showToolbar
      />
    </div>
  );
}
