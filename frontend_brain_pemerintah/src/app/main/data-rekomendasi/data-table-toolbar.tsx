"use client";

import { Rekomendasi } from "./columns";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useDataTable } from "./data-table-context";

interface DataTableToolbarProps {
  data: Rekomendasi[];
}

export function DataTableToolbar({ data }: DataTableToolbarProps) {
  const {
    selectedUrgency,
    setSelectedUrgency,
    selectedTypes,
    setSelectedTypes,
    selectedStatuses,
    setSelectedStatuses
  } = useDataTable();

  // Get unique values for filters
  const urgencyOptions = useMemo(() => {
    const unique = Array.from(new Set(data.map(item => item.skor_urgensi)));
    return unique.sort((a, b) => parseInt(a) - parseInt(b));
  }, [data]);

  const typeOptions = useMemo(() => {
    return Array.from(new Set(data.map(item => item.jenis_rekomendasi)));
  }, [data]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(data.map(item => item.status)));
  }, [data]);

  const handleUrgencyChange = (value: string) => {
    setSelectedUrgency(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    );
  };

  const handleTypeChange = (value: string) => {
    setSelectedTypes(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    );
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatuses(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="px-2 py-1 text-sm font-medium">Skor Urgensi</div>
        {urgencyOptions.map(option => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedUrgency.includes(option)}
            onCheckedChange={() => handleUrgencyChange(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
        
        <div className="px-2 py-1 text-sm font-medium mt-2">Jenis Kerusakan</div>
        {typeOptions.map(option => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedTypes.includes(option)}
            onCheckedChange={() => handleTypeChange(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
        
        <div className="px-2 py-1 text-sm font-medium mt-2">Status</div>
        {statusOptions.map(option => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedStatuses.includes(option)}
            onCheckedChange={() => handleStatusChange(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}