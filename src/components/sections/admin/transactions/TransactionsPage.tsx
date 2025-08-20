"use client";

import ErrorCard from "@/components/shared/ErrorCard";
import useTransactionsTable from "@/lib/hooks/transactions/useTransactionsTable";
import { transactionsTableColumns as columns } from "@/constants/table/columns/transactions-table-columns";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

export default function TransactionsPage() {
  const { loading, error, transactions } = useTransactionsTable();

  if (error) return <ErrorCard error={error.message} />;

  return (
    <div className="flex w-full">
      <DataGrid
        loading={loading}
        rows={transactions}
        columns={columns}
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnMenu
        showToolbar
        pagination
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </div>
  );
}
