"use client";

import data from "./data.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartAreaInteractive } from "@/components/ui/chart_statistic";
import { StatistikLaporanUtama, CardLaporanItemUtama } from "@/types/utamatype";
import { useState, useEffect } from "react";
import {
  statistikLaporanUtama,
  getCardLaporanUtama,
} from "@/services/utamaservice";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {
  FilesIcon,
  MegaphoneIcon,
  TrayArrowDownIcon,
} from "@phosphor-icons/react";
import { DataTable } from "@/components/dashboard/data-table";

export default function DashboardPage() {
  const batamCenter = {
    lat: 1.0452,
    lng: 104.0305,
  };

  const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [statistikLaporan, setStatistikLaporan] = useState<
    StatistikLaporanUtama[]
  >([]);

  useEffect(() => {
    statistikLaporanUtama()
      .then((data) => {
        setStatistikLaporan(data);
      })
      .catch((error) => {
        console.error("Error fetching laporan:", error);
      });
  }, []);

  const [laporan, setLaporan] = useState<CardLaporanItemUtama[]>([]);

  useEffect(() => {
    getCardLaporanUtama()
      .then((data) => {
        setLaporan(data);
      })
      .catch((error) => {
        console.error("Error fetching laporan:", error);
      });
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <ChartAreaInteractive
            itemStatistik={statistikLaporan}
            title="Statistik"
            titleSize="text-xl"
            showDescription={false}
          />
          <div className="flex flex-col gap-2">
            {/* Halaman peta */}
            <h3 className="text-xl font-semibold">Peta Persebaran</h3>
            <APIProvider apiKey={MapsKey ?? ""}>
              <div className="border-none overflow-hidden w-full h-80 rounded-4xl">
                <Map
                  style={{ width: "100%", height: "100%" }}
                  defaultCenter={batamCenter}
                  mapTypeId="hybrid"
                  defaultZoom={12}
                  gestureHandling="greedy"
                  disableDefaultUI={true}
                  mapId="YOUR_MAP_ID"
                />
              </div>
            </APIProvider>
          </div>

          {/* section card */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-6 items-start rounded-4xl">
              <div className="bg-blue-100 rounded-full p-4 flex-none">
                <FilesIcon className="size-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-medium">
                Total Laporan
              </CardTitle>
              <CardDescription className="text-black text-5xl font-semibold">
                1120
              </CardDescription>
            </Card>
            <Card className="p-6 items-start rounded-4xl">
              <div className="bg-blue-100 rounded-full p-4 flex-none">
                <TrayArrowDownIcon className="size-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-medium">
                Total Rekomendasi
              </CardTitle>
              <CardDescription className="text-black text-5xl font-semibold">
                728
              </CardDescription>
            </Card>
            <Card className="p-6 items-start rounded-4xl">
              <div className="bg-blue-100 rounded-full p-4 flex-none">
                <MegaphoneIcon className="size-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-medium">
                Keluhan Dominan
              </CardTitle>
              <CardDescription className="text-black text-5xl font-semibold">
                Jalan Rusak
              </CardDescription>
            </Card>
          </div>

          <DataTable data={data}/>
        </div>
      </div>
    </div>
  );
}
