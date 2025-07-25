"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import LoadingBubbles from "@/components/shared/LoadingBubbles";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { Transaction } from "@/types/transactions/transaction.d";
import { transactionsTableColumns as columns } from "@/constants/table/columns/transactions-table-columns";
import { GET_TRANSACTIONS_QUERY } from "@/constants/graphql/transactions/get-transactions.const";
import { useQuery } from "@apollo/client";

export default function TransactionsTable() {
  const { data, loading, error } = useQuery<{ transactions: Transaction[] }>(
    GET_TRANSACTIONS_QUERY
  );

  const transactions: Transaction[] = data?.transactions || [];

  if (loading) return <LoadingBubbles />;
  if (error) return <ErrorCard title="Error!" error={error.message} />;

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
