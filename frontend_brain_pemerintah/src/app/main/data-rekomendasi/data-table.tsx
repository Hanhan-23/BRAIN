"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/TablePagination";
import { useState, useMemo } from "react";
import { MobileRekomendasiCard } from "./mobile-recomended-card";
import { Rekomendasi } from "./columns";
import { useDataTable } from "./data-table-context";

interface DataTableProps<TData extends Rekomendasi, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Rekomendasi, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { selectedUrgency, selectedTypes, selectedStatuses } = useDataTable();

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Filter by urgency score
      const urgencyMatch = selectedUrgency.length === 0 || selectedUrgency.includes(item.skor_urgensi);
      
      // Filter by type
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.jenis_rekomendasi);
      
      // Filter by status
      const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
      
      return urgencyMatch && typeMatch && statusMatch;
    });
  }, [data, selectedUrgency, selectedTypes, selectedStatuses]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection
    },
  });

  return (
    <div>
      {/* Mobile View */}
      <div className="md:hidden space-y-0">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <MobileRekomendasiCard 
              key={row.id} 
              rekomendasi={row.original} 
            />
          ))
        ) : (
          <div className="h-24 text-center flex items-center justify-center">
            Tidak ada data
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const urgencyScore = parseInt(row.original.skor_urgensi);
                let rowColor = '';
                
                if (urgencyScore <= 2) {
                  rowColor = 'bg-stone-50 dark:bg-red-900/10';
                } else if (urgencyScore <= 4) {
                  rowColor = 'bg-stone-50 dark:bg-yellow-900/10';
                } else {
                  rowColor = 'bg-stone-50 dark:bg-green-900/10';
                }

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={rowColor}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}