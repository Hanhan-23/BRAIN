"use client";

import { Account, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Circle } from "lucide-react";
import { useState } from "react";

export function AccountsClient({ data }: { data: Account[] }) {
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

  const filteredData = roleFilter 
    ? data.filter(account => account.jabatan.toLowerCase() === roleFilter.toLowerCase())
    : data;

  const governmentCount = data.filter(account => account.jabatan.toLowerCase() === "government").length;
  const publicCount = data.filter(account => account.jabatan.toLowerCase() === "public").length;
  const totalCount = data.length;

  const displayCount = roleFilter 
    ? roleFilter.toLowerCase() === "government" 
      ? governmentCount 
      : publicCount
    : totalCount;

  return (
    <div className="">
      <div className="mb-4 px-4 py-2 bg-blue-200 rounded-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold">Data Akun Akses BRAIN</h1>
          <div className="relative">
            <Circle className="w-6 h-6 text-blue-800" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
              {displayCount}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setRoleFilter(undefined)}>
              Semua Akun
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRoleFilter("government")}>
              Pemerintah
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRoleFilter("public")}>
              Publik
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTable 
        columns={columns} 
        data={filteredData} 
        roleFilter={roleFilter}
        filteredCount={displayCount}
        totalCount={totalCount}
      />
    </div>
  );
}