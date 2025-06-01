"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Rekomendasi = {
  id: number;
  rekomendasi: string;
  jenis_rekomendasi: string;
  skor_urgensi: string;
  lokasi: string;
  status: string;
};

const photoDocumentation = [
  "/jembatan_rusak.jpg",
  "/jalanrusak.jpg",
  "/lampumati.jpg",
  "/jembatan_rusak.jpg",
  "/jembatan_rusak.jpg",
  "/jalanrusak.jpg",
  "/lampumati.jpg",
  "/jembatan_rusak.jpg",
  "/jembatan_rusak.jpg",
  "/jalanrusak.jpg",
  "/lampumati.jpg",
  "/jembatan_rusak.jpg",
];

const getRecommendationData = (id: number): Rekomendasi => {
  const types = ["Jalan Rusak", "Jembatan Rusak", "Lampu Jalan Rusak"];
  
  const recommendations: Rekomendasi[] = [
    {
      id: 1,
      rekomendasi: "Jalan berlubang besar",
      jenis_rekomendasi: types[0],
      skor_urgensi: "1",
      lokasi: "32VP+R7J, Jl. Ahmad Yani, Sukajadi, Kec. Batam Kota, Kota Batam",
      status: "Menunggu pengecekan"
    },
  ];

  return recommendations.find(rec => rec.id === id) || recommendations[0];
};

export default function RecommendationDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const recommendation = getRecommendationData(Number(params.id));

  return (
    <div className="w-full">
      <div className="px-4 py-2 w-full">
        <Button variant="ghost" onClick={() => router.back()} className="mb-2">
          <ChevronLeft className="h-4 w-4 mr-2" /> Kembali
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">{recommendation.rekomendasi}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="font-medium">Jenis:</span>
            <Badge variant="outline">{recommendation.jenis_rekomendasi}</Badge>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Lokasi:</span> {recommendation.lokasi}
            </p>
          </div>

          <div className="flex items-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-medium">Skor Urgensi:</span>
              <span>{recommendation.skor_urgensi}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge variant={getStatusVariant(recommendation.status)}>
                {recommendation.status}
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Dokumentasi Foto:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photoDocumentation.map((photo, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-square">
                    <Image
                      src={photo}
                      alt={`Dokumentasi ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-700">
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                      Dokumentasi {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Rencana Tindakan</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="font-medium mb-2">1. Pemeriksaan Lapangan</h3>
              <p className="text-gray-700 dark:text-gray-300">Tim akan melakukan pemeriksaan lapangan dalam 3 hari kerja</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h3 className="font-medium mb-2">2. Penyusunan Rencana</h3>
              <p className="text-gray-700 dark:text-gray-300">Penyusunan rencana perbaikan berdasarkan hasil pemeriksaan</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="font-medium mb-2">3. Pelaksanaan Perbaikan</h3>
              <p className="text-gray-700 dark:text-gray-300">Perbaikan akan dilaksanakan sesuai jadwal yang ditentukan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch(status) {
    case "Diperbaiki":
      return "default";
    case "Sedang diperbaiki":
      return "secondary";
    case "Diperiksa":
      return "outline";
    default:
      return "destructive";
  }
}