import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/landing_page/hero_section";
import About from "@/components/landing_page/about_section";
import CaraMelapor from "@/components/landing_page/howtoreports_section";
import Map from "@/components/landing_page/map_section";
import StatisticSections from "@/components/landing_page/statistic_section";
import ListLaporanSection from "@/components/landing_page/laporan_section";
import ListRekomendasiSection from "@/components/landing_page/rekomendasi_section";
import FormLapor from "@/components/lapor/formlapor";

export default function Home() {
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
            <Map />
          </section>
          <section className="w-full py-16" id="statistik-section">
            <StatisticSections />
          </section>
          <section className="w-full text-black py-16" id="laporan-section">
            <ListLaporanSection />
          </section>
          <section className="w-full h-screen text-black py-16 mb-24" id="rekomendasi-section">
            <ListRekomendasiSection />
          </section>
        </div>
      </div>
    </main>

    {/* Footer */}
      <Footer />
</>

  );
}

// Note: You had a duplicate Home component definition below which I've removed
// If you need a separate page for FormLapor, it should be in a different file