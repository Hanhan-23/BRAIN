'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/landing_page/hero_section";
import About from "@/components/landing_page/about_section";
import CaraMelapor from "@/components/landing_page/howtoreports_section";
import StatisticSections from "@/components/landing_page/statistic_section";
import ListLaporan from "@/components/landing_page/laporan_section";
import ListRekomendasi from "@/components/landing_page/rekomendasi_section";
import { useState, useEffect } from "react";
import { CardLaporanItemUtama, CardRekomendasiItemUtama, StatistikLaporanUtama } from "@/types/masyarakattypes/utamatype";
import { getCardLaporanUtama, getCardRekomendasiUtama, statistikLaporanUtama } from "@/services/masyarakatservices/utamaservice";
import MapComponent from "@/components/landing_page/map_section";
import { Button } from "@/components/ui/button"

export default function Home() {
    const [laporan, setLaporan] = useState<CardLaporanItemUtama[]>([]);
    const [rekomendasi, setRekomendasi] = useState<CardRekomendasiItemUtama[]>([]);
    const [statistikLaporan, setStatistikLaporan] = useState<StatistikLaporanUtama[]>([]);

    useEffect(() => {
        getCardLaporanUtama()
        .then((data) => {
            setLaporan(data);
        })
        .catch((error) => {
            console.error("Error fetching laporan:", error);
        });
    }, []);

    useEffect(() => {
        getCardRekomendasiUtama()
        .then((data) => {
            setRekomendasi(data);
        })
        .catch((error) => {
            console.error("Error fetching laporan:", error);
        });
    }, []);
    useEffect(() => {
        statistikLaporanUtama()
        .then((data) => {
            setStatistikLaporan(data);
        })
        .catch((error) => {
            console.error("Error fetching laporan:", error);
        });
    }, []);
    
    return (
        <>
        {/* navbar */}
        <Navbar />
        <main>
        <div className="w-full mx-auto">
            {/* Hero */}
            <div className="flex justify-center items-end md:items-center h-screen w-full bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/image/road_infrastructure.png')" }}>
            <div className="container w-full px-4 pb-20 md:px-8 lg:px-16 xl:px-20">
                <HeroSection />
            </div>
            </div>

            {/* Section konten */}
            <div className="w-full mx-auto flex flex-col px-4 py-16 md:px-8 lg:px-12 xl:px-20">
            <section className="scroll-mt-24" id="about-section">
                <About />
            </section>
            <section className="flex flex-col items-center text-black gap-y-16 py-16
            " id="cara-melapor-section">
                <CaraMelapor />
            </section>
            <section className="w-full text-black py-16" id="peta-persebaran-section">
                <MapComponent />
            </section>
            <section className="w-full py-16" id="statistik-section">
                <StatisticSections item={statistikLaporan}/>
            </section>
            <section className="w-full text-black py-16" id="laporan-section">
                <ListLaporan item={laporan} className={
                    "grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4"
                    } />
                <div className="flex justify-end">
                    <Button showButton={true} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Lihat semua</Button>
                </div>
            </section>
            <section className="w-full h-screen text-black py-16 mb-24" id="rekomendasi-section">
                <ListRekomendasi item={rekomendasi} className={
                    "grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4"
                }/>
                <div className="flex justify-end">
                    <Button showButton={true} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Lihat semua</Button>
                </div>
            </section>
            </div>
        </div>
        </main>

        {/* Footer */}
        <Footer />
    </>

    );
}