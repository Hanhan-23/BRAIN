"use client";

import Image from "next/image";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapPinIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const DetailLaporan = () => {
  const batamCenter = {
    lat: 1.0452,
    lng: 104.0305,
  };

  const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="flex flex-col p-6 gap-4 md:p-10">
      <div className="flex items-center gap-2">
        <span
          className="
                bg-blue-100 text-blue-600 py-0.5 px-2 text-[8px] text-nowrap rounded-full inline-block
                md:text-[0.625rem] lg:py-1 lg:text-xs
            "
        >
          Jalan Rusak
        </span>
        <span
          className="
                bg-red-100 text-red-600 py-0.5 px-2 text-[8px] text-nowrap rounded-full inline-block
                md:text-[0.625rem] lg:py-1 lg:text-xs
            "
        >
          Tinggi
        </span>
        <span className="text-slate-500 text-base">●</span>
        <span className="text-slate-500 text-base">12 Maret 2025</span>
      </div>

      <h3 className="text-4xl font-medium">
        Jalan di simpang lampu merah berlubang
      </h3>
      <div className="flex items-center gap-2">
        <div className="border border-slate-300 rounded-md p-3">
          <MapPinIcon className="size-4.5 text-blue-600" />
        </div>
        <p>
          Jl. Ahmad Yani, Kabil, Kecamatan Nongsa, Kota Batam, Kepulauan Riau
          29444
        </p>
      </div>

          <h3 className="text-2xl font-semibold">Status</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Timeline />
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

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">Daftar Laporan Terkait</h3>
        <div className="grid grid-cols-1">
          <div className="flex items-center justify-between border border-gray-300 rounded-3xl p-2 relative">
            <div className="flex items-center gap-x-3">
              <Image
                className="rounded-2xl aspect-square"
                src={`/jalanrusak.jpg`}
                width={100}
                height={100}
                alt="ilustrasi aplikasi"
              />
              <div className="flex flex-col gap-1 max-w-xl">
                <p className="text-2xl font-medium">
                  Jalan depan wynham panbil rusak.
                </p>
                <p className="text-sm line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur. Nunc nisl morbi aenean
                  molestie venenatis habitant elementum. Interdum
                </p>
              </div>
            </div>

            <Button size={"iconCircle"} variant={"outline"} className="p-4 absolute right-8">
              <WarningCircleIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="border border-slate-300 p-2.5 rounded-2xl">
      <div className="ps-2 my-2 first:mt-0">
        <h3 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-400">
          18 Maret 2025
        </h3>
      </div>

      <div className="flex gap-x-3">
        <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
          <div className="relative z-10 size-7 flex justify-center items-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600" />
          </div>
        </div>
        <div className="grow pt-0.5 pb-8">
          <div
            className="
                bg-green-100 text-green-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block mb-1
                md:text-[10px] lg:py-1 lg:text-xs grow-0
            "
          >
            Selesai
          </div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Laporan telah diperbaiki dan aman digunakan
          </p>
        </div>
      </div>

      <div className="ps-2 my-2 first:mt-0">
        <h3 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-400">
          16 Maret 2025
        </h3>
      </div>

      <div className="flex gap-x-3">
        <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
          <div className="relative z-10 size-7 flex justify-center items-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600" />
          </div>
        </div>
        <div className="grow pt-0.5 pb-8">
          <div
            className="
                bg-orange-100 text-orange-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block mb-1
                md:text-[10px] lg:py-1 lg:text-xs grow-0
            "
          >
            Diproses
          </div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Laporan sedang diperbaiki oleh petugas
          </p>
        </div>
      </div>

      <div className="ps-2 my-2 first:mt-0">
        <h3 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-400">
          13 Maret 2025
        </h3>
      </div>

      <div className="flex gap-x-3">
        <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
          <div className="relative z-10 size-7 flex justify-center items-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600" />
          </div>
        </div>
        <div className="grow pt-0.5 pb-8">
          <div
            className="
                bg-blue-100 text-blue-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block mb-1
                md:text-[10px] lg:py-1 lg:text-xs grow-0
            "
          >
            Divalidasi
          </div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Laporan disetujui untuk ditindaklanjuti
          </p>
        </div>
      </div>

      <div className="ps-2 my-2 first:mt-0">
        <h3 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-400">
          12 Maret 2025
        </h3>
      </div>

      <div className="flex gap-x-3">
        <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
          <div className="relative z-10 size-7 flex justify-center items-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600" />
          </div>
        </div>
        <div className="grow pt-0.5 pb-8">
          <div
            className="
                bg-red-100 text-red-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block mb-1
                md:text-[10px] lg:py-1 lg:text-xs grow-0
            "
          >
            Belum Divalidasi
          </div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Laporan kerusakan dari wara telah diterima, menunggu validasi oleh
            petugas
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporan;
