'use client';

import React, { useState, useMemo, useCallback } from 'react';

export interface Column<T = any> {
  field: string;
  headerName: string;
  width?: number;
  minWidth?: number;
  flex?: number;
  sortable?: boolean;
  renderCell?: (params: { row: T; value: any }) => React.ReactNode;
  valueGetter?: (row: T) => any;
}

export interface DataGridProps<T = any> {
  rows: T[];
  columns: Column<T>[];
  loading?: boolean;
  checkboxSelection?: boolean;
  onRowSelectionModelChange?: (selected: (string | number)[]) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  rowHeight?: number;
  headerHeight?: number;
  disableColumnMenu?: boolean;
  disableColumnResize?: boolean;
  disableRowSelectionOnClick?: boolean;
  getRowId?: (row: T) => string | number;
  slots?: {
    toolbar?: React.ComponentType<any>;
    noRowsOverlay?: React.ComponentType;
    loadingOverlay?: React.ComponentType;
  };
  slotProps?: any;
}

export default function DataGrid<T extends { id?: string | number }>({
  rows,
  columns,
  loading = false,
  checkboxSelection = false,
  onRowSelectionModelChange,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  rowHeight = 52,
  headerHeight = 56,
  getRowId = (row) => row.id!,
  slots,
}: DataGridProps<T>) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Sort and paginate data
  const sortedAndPaginatedRows = useMemo(() => {
    let processedRows = [...rows];

    // Sort
    if (sortField) {
      processedRows.sort((a: any, b: any) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue > bValue ? 1 : -1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Paginate
    const start = page * pageSize;
    const end = start + pageSize;
    return processedRows.slice(start, end);
  }, [rows, sortField, sortDirection, page, pageSize]);

  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allIds = rows.map(row => getRowId(row));
      setSelectedRows(new Set(allIds));
      onRowSelectionModelChange?.(allIds);
    } else {
      setSelectedRows(new Set());
      onRowSelectionModelChange?.([]);
    }
  }, [rows, getRowId, onRowSelectionModelChange]);

  const handleSelectRow = useCallback((rowId: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onRowSelectionModelChange?.(Array.from(newSelected));
  }, [selectedRows, onRowSelectionModelChange]);

  const totalPages = Math.ceil(rows.length / pageSize);
  const isAllSelected = rows.length > 0 && selectedRows.size === rows.length;
  const isSomeSelected = selectedRows.size > 0 && selectedRows.size < rows.length;

  const Toolbar = slots?.toolbar;

  return (
    <div className="datagrid-container">
      {Toolbar && (
        <div className="datagrid-toolbar">
          <Toolbar />
        </div>
      )}
      
      <div className="datagrid-wrapper">
        {loading && (
          <div className="datagrid-loading">
            <div className="btn-spinner" />
            <p>Loading...</p>
          </div>
        )}
        
        <table className="datagrid-table">
          <thead>
            <tr style={{ height: headerHeight }}>
              {checkboxSelection && (
                <th className="datagrid-header-cell text-center w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="checkbox-input"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.field}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    flex: column.flex,
                  }}
                  className={`datagrid-header-cell ${column.sortable !== false ? 'datagrid-header-cell-sortable' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.field)}
                >
                  <span>{column.headerName}</span>
                  {sortField === column.field && (
                    <i className={`bi bi-arrow-${sortDirection === 'asc' ? 'up' : 'down'}`} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAndPaginatedRows.length === 0 && !loading ? (
              <tr>
                <td colSpan={columns.length + (checkboxSelection ? 1 : 0)} className="text-center py-8 text-gray-500">
                  No rows to display
                </td>
              </tr>
            ) : (
              sortedAndPaginatedRows.map((row) => {
                const rowId = getRowId(row);
                const isSelected = selectedRows.has(rowId);
                
                return (
                  <tr
                    key={rowId}
                    style={{ height: rowHeight }}
                    className={isSelected ? 'datagrid-body-row-selected' : ''}
                  >
                    {checkboxSelection && (
                      <td className="datagrid-body-cell text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(rowId, e.target.checked)}
                          className="checkbox-input"
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = column.valueGetter
                        ? column.valueGetter(row)
                        : (row as any)[column.field];
                      
                      return (
                        <td key={column.field} className="datagrid-body-cell">
                          {column.renderCell
                            ? column.renderCell({ row, value })
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="datagrid-pagination">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {page * pageSize + 1}-{Math.min((page + 1) * pageSize, rows.length)} of {rows.length}
          </span>
          
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="text-field-input py-1 px-2"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size} rows</option>
            ))}
          </select>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              className="icon-button icon-button-small"
              aria-label="First page"
            >
              <i className="bi bi-chevron-double-left" />
            </button>
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
              className="icon-button icon-button-small"
              aria-label="Previous page"
            >
              <i className="bi bi-chevron-left" />
            </button>
            <span className="text-sm text-gray-600 px-2">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages - 1}
              className="icon-button icon-button-small"
              aria-label="Next page"
            >
              <i className="bi bi-chevron-right" />
            </button>
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              className="icon-button icon-button-small"
              aria-label="Last page"
            >
              <i className="bi bi-chevron-double-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
