"use client";

import { useState } from "react";
import { Button } from "@/componentspemerintah/ui/button";
import { Checkbox } from "@/componentspemerintah/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/componentspemerintah/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Filter, X } from "lucide-react";
import { DetailsDialog } from "./details-dialog";

export type Recommended = {
  id: string;
  tanggal: string;
  judul: string;
  deskripsi: string;
  cuaca: string;
  kerusakan: string;
  lokasi: string;
  status: "selesai" | "disembunyikan";
};

type CellProps<TData> = {
  row: Row<TData>;
};

const truncateText = (text: string, maxLength: number = 25) => {
  if (!text) return "-";
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const SUBDISTRICTS = [
  "Sekupang",
  "Batu Ampar",
  "Sei Beduk",
  "Nongsa",
  "Belakang Padang",
  "Galang",
  "Lubuk Baja",
  "Bulang",
  "Batam Kota",
  "Batu Aji",
  "Sagulung",
  "Bengkong",
];

const JudulCell = ({ row }: CellProps<Recommended>) => {
  const [open, setOpen] = useState(false);
  const judul = row.getValue("judul") as string;
  
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="text-left hover:underline border-b border-dashed border-gray-300"
      >
        {truncateText(judul, 25)}
      </button>
      <DetailsDialog 
        open={open} 
        onOpenChange={setOpen} 
        report={row.original} 
      />
    </>
  );
};

const ActionsCell = ({ row }: CellProps<Recommended>) => {
  const [open, setOpen] = useState(false);
  const pengaduan = row.original;

  const handleStatusChange = (id: string, newStatus: "selesai" | "disembunyikan") => {
    console.log(`Mengubah status pengaduan ${id} menjadi ${newStatus}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "selesai")}>
                Selesai
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "disembunyikan")}>
                Disembunyikan
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <DetailsDialog 
        open={open} 
        onOpenChange={setOpen} 
        report={pengaduan} 
      />
    </>
  );
};

export const columns: ColumnDef<Recommended>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center w-full">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "judul",
    header: "Judul Pengaduan",
    cell: JudulCell,
  },
  {
    accessorKey: "cuaca",
    header: "Cuaca",
  },
  {
    accessorKey: "kerusakan",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Kerusakan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center w-full">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "lokasi",
    header: ({ table }) => {
      const filterValue = table.getState().columnFilters.find(f => f.id === 'lokasi')?.value as string;
      
      return (
        <div className="flex items-center gap-2">
          <span>Lokasi</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={filterValue ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-200"
              >
                {filterValue ? (
                  <X className="h-4 w-4" onClick={(e) => {
                    e.stopPropagation();
                    table.setColumnFilters([]);
                  }} />
                ) : (
                  <Filter className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter Kecamatan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SUBDISTRICTS.map((subdistrict) => (
                <DropdownMenuItem
                  key={subdistrict}
                  onClick={() => {
                    table.setColumnFilters([{ id: 'lokasi', value: subdistrict }]);
                  }}
                  className={filterValue === subdistrict ? "bg-gray-100" : ""}
                >
                  {subdistrict}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => table.setColumnFilters([])}
                className="text-center justify-center"
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const lokasi = row.getValue("lokasi") as string;
      return (
        <div className="text-left whitespace-normal break-words">
          {lokasi || "-"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;
      const location = row.getValue(id) as string;
      return location.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "p-1 rounded-md w-max text-xs",
              status === "selesai" && "bg-blue-300/40 text-blue-800 dark:bg-red-300/50 dark:text-slate-50",
              status === "disembunyikan" && "bg-gray-400/40 text-gray-800 dark:bg-indigo-300/50 dark:text-slate-50"
            )}
          >
            {status as string}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  }
];