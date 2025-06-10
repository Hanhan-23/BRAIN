"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/componentspemerintah/ui/button";
import { Checkbox } from "@/componentspemerintah/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/componentspemerintah/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Type definition for Rekomendasi
export type Rekomendasi = {
  id: number;
  rekomendasi: string;
  jenis_rekomendasi: "Jalan Rusak" | "Jembatan Rusak" | "Lampu Jalan Rusak" | string;
  skor_urgensi: string;
  lokasi: string;
  status: "Diperiksa" | "Menunggu perbaikan" | "Menunggu pengecekan" | "Sedang diperbaiki" | "Diperbaiki";
};

// Dummy function for handling status change - implement your actual logic here
const handleStatusChange = (id: number, newStatus: Rekomendasi["status"]) => {
  console.log(`Mengubah status rekomendasi ${id} menjadi ${newStatus}`);
  // Example: API call to update status
  // fetch(`/api/rekomendasi/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
};

export const columns: ColumnDef<Rekomendasi>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   accessorKey: "rekomendasi",
  //   header: "Rekomendasi",
  //   cell: ({ row }) => <div>{row.getValue("rekomendasi")}</div>,
  // },
   {
    accessorKey: "rekomendasi",
    header: "Rekomendasi",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          href={`/main/data-rekomendasi/${id}`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {row.getValue("rekomendasi")}
        </Link>
      );
    },
  },

  // kalau misal udah ada id
//   {
//   accessorKey: "rekomendasi",
//   header: "Rekomendasi",
//   cell: ({ row }) => {
//     const id = row.original.id;
//     return (
//       <Link
//         href={`/data-rekomendasi/${id}`}
//         className="text-blue-600 hover:underline"
//       >
//         {row.getValue("rekomendasi")}
//       </Link>
//     );
//   },
// },

  {
    accessorKey: "jenis_rekomendasi",
    header: "Jenis Rekomendasi",
    cell: ({ row }) => <div>{row.getValue("jenis_rekomendasi")}</div>,
  },
  {
    accessorKey: "skor_urgensi",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="mx-auto"
          >
            Skor Urgensi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center w-full">{row.getValue("skor_urgensi")}</div>
    ),
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
    cell: ({ row }) => {
      const lokasi = row.getValue("lokasi") as string;
      return (
        <div className="text-left whitespace-normal break-words">
          {lokasi || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string; // Cast to string for cn compatibility

      // Note: The status values in `cn` below ("Belum Divalidasi", etc.)
      // differ from the `Rekomendasi` type's status options ("Diperiksa", etc.).
      // You might want to align these for consistency.
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              `p-1 rounded-md w-max text-xs font-semibold`,
              status === "Diperiksa" && "bg-yellow-500/40 text-yellow-800 dark:bg-yellow-300/50 dark:text-slate-50", // Example color for "Diperiksa"
              status === "Menunggu perbaikan" && "bg-orange-500/40 text-orange-800 dark:bg-orange-300/50 dark:text-slate-50", // Example
              status === "Menunggu pengecekan" && "bg-blue-500/40 text-blue-800 dark:bg-blue-300/50 dark:text-slate-50", // Example
              status === "Sedang diperbaiki" && "bg-indigo-500/40 text-indigo-800 dark:bg-indigo-300/50  dark:text-slate-50",
              status === "Diperbaiki" && "bg-teal-500/40 text-teal-800 dark:bg-teal-300/50  dark:text-slate-50",
              // Fallback or other statuses if any
              ![
                "Diperiksa",
                "Menunggu perbaikan",
                "Menunggu pengecekan",
                "Sedang diperbaiki",
                "Diperbaiki",
              ].includes(status) && "bg-gray-500/40 text-gray-800 dark:bg-gray-300/50 dark:text-slate-50"
            )}
          >
            {status}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rekomendasi = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rekomendasi.id.toString())}
            >
              Copy ID Rekomendasi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Ubah Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {/*
                  The status options here are different from your Rekomendasi type.
                  You should align these with the values in your Rekomendasi type:
                  "Diperiksa", "Menunggu perbaikan", "Menunggu pengecekan", "Sedang diperbaiki", "Diperbaiki"
                */}
                <DropdownMenuItem onClick={() => handleStatusChange(rekomendasi.id, "Diperiksa")}>
                  Diperiksa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(rekomendasi.id, "Menunggu pengecekan")}>
                  Menunggu Pengecekan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(rekomendasi.id, "Menunggu perbaikan")}>
                  Menunggu Perbaikan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(rekomendasi.id, "Sedang diperbaiki")}>
                  Sedang Diperbaiki
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(rekomendasi.id, "Diperbaiki")}>
                  Diperbaiki
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];