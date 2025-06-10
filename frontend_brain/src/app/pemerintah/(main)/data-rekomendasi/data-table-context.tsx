"use client";

import { createContext, useContext, useState } from "react";

interface DataTableContextType {
  selectedUrgency: string[];
  setSelectedUrgency: (value: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (value: string[]) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (value: string[]) => void;
}

const DataTableContext = createContext<DataTableContextType>({
  selectedUrgency: [],
  setSelectedUrgency: () => {},
  selectedTypes: [],
  setSelectedTypes: () => {},
  selectedStatuses: [],
  setSelectedStatuses: () => {},
});

export function DataTableProvider({ children }: { children: React.ReactNode }) {
  const [selectedUrgency, setSelectedUrgency] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  return (
    <DataTableContext.Provider
      value={{
        selectedUrgency,
        setSelectedUrgency,
        selectedTypes,
        setSelectedTypes,
        selectedStatuses,
        setSelectedStatuses,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTable() {
  return useContext(DataTableContext);
}