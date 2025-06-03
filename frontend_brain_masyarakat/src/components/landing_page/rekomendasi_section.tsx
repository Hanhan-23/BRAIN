import { Card, CardTitle, CardDescription } from "../ui/card"
import Image from "next/image"
import { Button } from "../ui/button"

const ListRekomendasiSection = () => {
    return (
        <>
            <p className="text-3xl font-semibold mb-2 md:block md:text-3xl lg:text-5xl" id="rekomendasi-section">Daftar Rekomendasi Urgensi</p>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <CardLaporan />
                    <CardLaporan />
                    <CardLaporan />
                    <CardLaporan />
                </div>
                <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Lihat semua</Button>
                </div>
            </div>
        </>
    )
}

const CategoryBadge = () => {
    return (
        <div className="
            bg-blue-200 text-blue-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block
            md:text-[10px] lg:py-1 lg:text-xs
        ">
            Jalan Rusak
        </div>
    )
}

const LevelBadge = () => {
    return (
        <div className="
            bg-red-200 text-red-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block
            md:text-[10px] lg:py-1 lg:text-xs
        ">
            Tinggi
        </div>
    )
}

const CardLaporan = () => {
    return (
        <Card className="col-span-1 p-2 md:p-3 rounded-2xl">
            <Image
                className="w-full rounded-xl mb-2"
                src="/image/gambar_01.png"
                width={100}
                height={100}
                alt="ilustrasi aplikasi"
            />
            <div className="flex flex-wrap gap-1 mb-1">
                <CategoryBadge />
                <LevelBadge />
            </div>
            <CardTitle className="text-base truncate lg:mb-2">Jalan simpang kepri mengalami kerusakan jalan</CardTitle>
            <CardDescription className="text-[10px] line-clamp-2 md:mb-2 md:text-xs lg:text-sm">Lorem ipsum dolor sit amet consectetur. Eu blandit leo etiam aliquam posuere</CardDescription>
        </Card>
    )
}

export default ListRekomendasiSection;