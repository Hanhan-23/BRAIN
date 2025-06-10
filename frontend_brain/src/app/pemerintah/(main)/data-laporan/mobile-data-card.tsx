"use client";

import { Recommended } from "./columns";
import { Button } from "@/componentspemerintah/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/componentspemerintah/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DetailsDialog } from "./details-dialog";
import { useState } from "react";

interface MobileDataCardProps {
  report: Recommended;
}

export function MobileDataCard({ report }: MobileDataCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleStatusChange = (id: string, newStatus: "selesai" | "disembunyikan") => {
    console.log(`Mengubah status pengaduan ${id} menjadi ${newStatus}`);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-base">{report.judul}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleStatusChange(report.id, "selesai")}>
                  Selesai
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(report.id, "disembunyikan")}>
                  Disembunyikan
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tanggal</span>
          <span>{report.tanggal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cuaca</span>
          <span>{report.cuaca}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Kerusakan</span>
          <span>{report.kerusakan}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-md text-xs",
              report.status === "selesai" && "bg-blue-300/40 text-blue-800 dark:bg-red-300/50 dark:text-slate-50",
              report.status === "disembunyikan" && "bg-gray-400/40 text-gray-800 dark:bg-indigo-300/50 dark:text-slate-50"
            )}
          >
            {report.status}
          </span>
        </div>
      </div>

      <DetailsDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        report={report} 
      />
    </div>
  );
}