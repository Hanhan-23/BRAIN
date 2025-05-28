import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/landing_page/hero_section";
import Tentang from "@/components/landing_page/tentang_section";
import CaraMelapor from "@/components/landing_page/howtoreports_section";
import Map from "@/components/landing_page/map_section";
import StatisticSections from "@/components/landing_page/statistic_section";
import ListLaporanSection from "@/components/landing_page/laporan_section";
import ListRekomendasiSection from "@/components/landing_page/rekomendasi_section";

export default function Home() {
  return (
    <div>
        <Navbar></Navbar>

        <div className="w-full mx-auto">
          <div className="flex justify-center items-center h-screen w-full bg-cover bg-no-repeat" style={{backgroundImage: "url('/image/road_infrastructure.png')"}}>
            <div className="container w-full px-20">
                <HeroSection></HeroSection>
            </div>
          </div>

          <div className="container w-full mx-auto flex flex-col px-20 mt-16">
            <Tentang></Tentang>
            <CaraMelapor></CaraMelapor>
            <Map></Map>
            <StatisticSections></StatisticSections>
            <ListLaporanSection></ListLaporanSection>
            <ListRekomendasiSection></ListRekomendasiSection>
          </div>

        </div>

      <div className="w-full px-9 py-6 bg-white">
        <Footer></Footer>
      </div>
    </div>
  );
}
