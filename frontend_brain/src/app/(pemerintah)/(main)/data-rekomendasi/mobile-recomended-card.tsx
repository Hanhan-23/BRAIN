"use client";

import { Rekomendasi } from "./columns";
import { Button } from "@/componentspemerintah/ui/button";
import { MoreHorizontal } from "lucide-react";
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

const handleStatusChange = (id: number, newStatus: string) => {
  console.log(`Mengubah status rekomendasi ${id} menjadi ${newStatus}`);
  // Add API call here if needed
};

export function MobileRekomendasiCard({ rekomendasi }: { rekomendasi: Rekomendasi }) {
  const urgencyScore = parseInt(rekomendasi.skor_urgensi);
  let cardColor = '';
  let darkCardColor = '';

  if (urgencyScore <= 2) { // High urgency (1-2)
    cardColor = 'bg-red-800 border-l-4 border-red-500';
    darkCardColor = 'dark:bg-red-900/20 dark:border-red-600';
  } else if (urgencyScore <= 4) { // Medium urgency (3-4)
    cardColor = 'bg-yellow-50 border-l-4 border-yellow-500';
    darkCardColor = 'dark:bg-yellow-900/20 dark:border-yellow-600';
  } else { // Low urgency (5+)
    cardColor = 'bg-green-50 border-l-4 border-green-500';
    darkCardColor = 'dark:bg-green-900/20 dark:border-green-600';
  }


  return (
    <div className={`rounded-lg p-4 mb-4 shadow-sm ${cardColor} ${darkCardColor}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-base">{rekomendasi.rekomendasi}</h3>
          <p className="text-sm text-muted-foreground">{rekomendasi.jenis_rekomendasi}</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rekomendasi.id.toString())}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Ubah Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
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
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Skor Urgensi</span>
          <span className="font-medium">{rekomendasi.skor_urgensi}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-md text-xs font-semibold",
              rekomendasi.status === "Diperiksa" && "bg-yellow-500/40 text-yellow-800 dark:bg-yellow-300/50 dark:text-slate-50",
              rekomendasi.status === "Menunggu perbaikan" && "bg-orange-500/40 text-orange-800 dark:bg-orange-300/50 dark:text-slate-50",
              rekomendasi.status === "Menunggu pengecekan" && "bg-blue-500/40 text-blue-800 dark:bg-blue-300/50 dark:text-slate-50",
              rekomendasi.status === "Sedang diperbaiki" && "bg-indigo-500/40 text-indigo-800 dark:bg-indigo-300/50 dark:text-slate-50",
              rekomendasi.status === "Diperbaiki" && "bg-teal-500/40 text-teal-800 dark:bg-teal-300/50 dark:text-slate-50"
            )}
          >
            {rekomendasi.status}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Lokasi</span>
          <p className="mt-1 text-sm whitespace-normal break-words">
            {rekomendasi.lokasi || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}