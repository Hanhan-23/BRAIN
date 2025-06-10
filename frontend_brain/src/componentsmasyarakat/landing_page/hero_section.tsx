import { Button } from "../ui/button";

const HeroSection = () => {
    return (
        <div className="max-w-xl text-white">
            <p className="text-5xl md:text-6xl font-bold mb-2">Laporkan Kerusakan Jalan dengan Mudah!</p>
            <p className="text-base mb-4">Setiap laporan dari Anda membantu menciptakan jalan Kota Batam yang lebih aman dan nyaman untuk semua. </p>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
                Laporkan Sekarang
            </Button>
        </div>
    )
}

export default HeroSection;