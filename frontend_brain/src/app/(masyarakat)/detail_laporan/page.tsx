"use client"

import Image from "next/image";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapPinIcon } from "@phosphor-icons/react";

const DetailLaporan = () => {
  const batamCenter = { 
        lat: 1.0452, 
        lng: 104.0305 
    };

    const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="flex flex-col p-6 gap-4 md:p-10">
      <div className="flex items-center gap-2">
        <span
          className="
              bg-blue-100 text-blue-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block
              md:text-[10px] lg:py-1 lg:text-base
          "
        >
          Jalan Rusak
        </span>
        <span className="text-slate-500 text-base">●</span>
        <span className="text-slate-500 text-base">12 Maret 2025</span>
      </div>

      <h1 className="text-4xl font-medium">
        Jalan di simpang lampu merah berlubang
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Image
            className="w-full h-full rounded-2xl aspect-square"
            src={`/jalanrusak.jpg`}
            width={100}
            height={100}
            alt="ilustrasi aplikasi"
          />
        </div>
        <div className="col-span-2">
          <APIProvider apiKey={MapsKey ?? ""}>
            <div className="border-none overflow-hidden shadow-sm w-full h-full rounded-2xl">
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
      </div>
      <div className="flex items-center gap-2">
        <div className="border border-slate-300 rounded-md p-3">
          <MapPinIcon className="size-4.5 text-blue-600" />
        </div>
        <p>Jl. Ahmad Yani, Kabil, Kecamatan Nongsa, Kota Batam, Kepulauan Riau 29444</p>
      </div>
      <p>Jalan berlubang penyebab kecelakaan motor kemarin sore  dan sudah satu bulan belum diperbaiki sama sekali</p>
    </div>
  );
};

export default DetailLaporan;
