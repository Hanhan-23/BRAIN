'use client'

import { Badge } from "@/componentspemerintah/ui/badge";
import { TrendingUp, TriangleAlert } from "lucide-react";
import AppPieChart from "@/componentspemerintah/AppPieChart";
import CardList from "@/componentspemerintah/CardList";
import AppAreaChart from "@/componentspemerintah/AppAreaChart";
import MapContainer from "@/componentspemerintah/MapContainer";
import { useEffect, useState } from "react";
import { empatAnalisis, rekomendasiBerandaPemerintah } from "@/types/pemerintahtypes/berandatype";
import { getEmpatAnalisis, RekomendasiBerandaPemerintah } from "@/services/pemerintahservices/berandaservice";

const Dashboard = () => {

  const [empatAnalisis, setEmpatAnalisis] = useState<empatAnalisis>();
  const [berandarekomendasi, setBerandaRekomendasi] = useState<rekomendasiBerandaPemerintah[]>([]);

  const access_token = localStorage.getItem('access_token')

  useEffect(() => {
    getEmpatAnalisis({ access_token: access_token ?? '' })
    .then((data) => {
        setEmpatAnalisis(data);
    })
    .catch((error) => {
        console.error("Error fetching laporan:", error);
    });
  }, [])

  useEffect(() => {
    RekomendasiBerandaPemerintah({ access_token: access_token ?? '' })
    .then((data) => {
        setBerandaRekomendasi(data);
    })
    .catch((error) => {
        console.error("Error fetching laporan:", error);
    });
  }, [])
  
  // Data for the pie chart
  const pieChartData = [
    { name: "Total Laporan Terkini :", value: empatAnalisis?.total_laporan_terkini ?? 0, color: "#bfdbfe" },
    { name: "Rekomendasi Terkini :", value: empatAnalisis?.total_rekomendasi_terkini ?? 0, color: "#a855f7" },
    { name: "Rekomendasi Tervalidasi :", value: empatAnalisis?.total_rekomendasi_valid ?? 0, color: "#22c55e" },
    { name: "Rekomendasi Butuh Validasi :", value: empatAnalisis?.total_rekomendasi_belumvalid ?? 0, color: "#f59e0b" },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Welcome Message Section */}
      <div className="bg-blue-200 dark:bg-zinc-900 text-center text-black dark:text-white p-2 rounded-md shadow-lg shadow-blue-900/20 dark:shadow-blue-500/20">
        <h1 className="text-xl font-bold">Welcome to BRAIN</h1>
        <h2 className="text-md font-bold">Batam Road AI Network</h2>
      </div>

      {/* CONTAINER */}
      <div className="mt-4 flex flex-col xl:flex-row gap-4 md:gap-8 mb-8">
        {/* LEFT - PIE CHART AND CARD LIST */}
        <div className="w-full xl:w-1/3 space-y-4 md:space-y-6">
          {/* PIE CHART CONTAINER */}
          <div className="bg-primary-foreground p-2 rounded-lg h-[280px] shadow-lg shadow-blue-700/20">
            <h1 className="text-md font-medium mb-0 flex items-center gap-1 dark:text-white">
              Ringkasan terkini data laporan masyarakat
              <TrendingUp className="h-6 w-6 text-green-500" />
            </h1>
            <div className="h-[calc(100%-24px)]">
              <AppPieChart data={pieChartData} />
            </div>
          </div>

          {/* CARD LIST CONTAINER */}
          <div className="bg-primary-foreground p-4 md:p-6 rounded-lg shadow-lg shadow-blue-700/20">
            <div className="flex items-center gap-2 mb-4">
              <TriangleAlert className="h-6 w-6 text-red-600" />
              <h2 className="text-lg font-semibold text-red-600">Tangani Segera</h2>
            </div>
            <CardList rekomendasiData={berandarekomendasi}/>
          </div>
        </div>

        {/* RIGHT - STATS, LINE CHART, AND MAP */}
        <div className="w-full xl:w-2/3 space-y-4 md:space-y-6">
          {/* STATS CONTAINER - Made responsive */}
          <div className="bg-primary-foreground p-4 rounded-lg shadow-lg shadow-blue-700/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 md:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-xs md:text-sm font-medium">Jumlah Laporan Terkini</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{empatAnalisis?.total_laporan_terkini}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 md:p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-xs md:text-sm font-medium">Rekomendasi Terkini</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{empatAnalisis?.total_rekomendasi_terkini}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 md:p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-xs md:text-sm font-medium">Rekomendasi Tervalidasi</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{empatAnalisis?.total_rekomendasi_valid}</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 md:p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h3 className="text-xs md:text-sm font-medium">Rekomendasi Butuh Validasi</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{empatAnalisis?.total_rekomendasi_belumvalid}</p>
              </div>
            </div>
          </div>

          {/* MAP CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg shadow-lg shadow-blue-700/20">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-lg md:text-xl font-semibold">Peta Laporan Infrastruktur Jalan Batam</h1>
            </div>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-md overflow-hidden border">
              <MapContainer />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                Laporan Baru
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                Dalam Proses
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                Selesai
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* LINE CHART CONTAINER - Made responsive */}
      <div className="w-full relative h-[250px] sm:h-[300px] md:h-[350px]">
        <div className="bg-primary-foreground p-4 rounded-lg shadow-lg shadow-blue-700/20">
          <h2 className="text-base md:text-lg font-semibold mb-2 text-cyan-700">
            Perkembangan Laporan Infrastruktur Jalan Batam
          </h2>
          <div className="h-[300px] md:h-[400px]">
            <AppAreaChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;