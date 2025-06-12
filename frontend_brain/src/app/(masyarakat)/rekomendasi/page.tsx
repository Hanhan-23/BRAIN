"use client"

import { ChartAreaInteractive } from "@/components/ui/chart_statistic";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { 
  CaretRightIcon,
  CaretLeftIcon,
  } from "@phosphor-icons/react";

import ListRekomendasi from "@/components/landing_page/rekomendasi_section";

const RekomendasiPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="flex px-4 lg:px-6">
            <Input
              type="search"
              placeholder="Cari..."
              className="pl-10 w-[200px] md:w-[300px] lg:max-w-2xl lg:w-full focus:border-blue-500 text-blue-400 focus:outline-none rounded-full"
            />
            <div className="ml-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Seminggu Terakhir">
                    Seminggu Terakhir
                  </SelectItem>
                  <SelectItem value="Sebulan Terakhir">
                    Sebulan Terakhir
                  </SelectItem>
                  <SelectItem value="Setahun Terakhir">
                    Setahun Terakhir
                  </SelectItem>
                  <SelectItem value="Semua Periode">Semua Periode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="px-4 lg:px-6">
            <ListRekomendasi
              className={
                "grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
              }
            />
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink>
                    <CaretLeftIcon></CaretLeftIcon>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>
                    <CaretRightIcon></CaretRightIcon>
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiPage;
