import { Card, CardTitle, CardDescription } from "../ui/card"
import Image from "next/image"
import { Button } from "../ui/button"

const ListLaporanSection = () => {
    return (
        <div className="w-full text-black py-16" id="laporan-section">
            <p className="text-5xl font-semibold mb-6">Daftar Laporan Terkini</p>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-4">
                    <CardLaporan />
                    <CardLaporan />
                    <CardLaporan />
                    <CardLaporan />
                </div>
                <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Lihat semua</Button>
                </div>
            </div>
        </div>
    )
}

const CategoryBadge = () => {
    return (
        <div className="bg-blue-200 text-blue-600 py-1 px-2 text-xs rounded-full inline-block">
            Jalan Rusak
        </div>
    )
}

const CardLaporan = () => {
    return (
        <Card className="col-span-1 p-3 rounded-2xl">
            <Image
                className="w-full rounded-xl mb-2"
                src="/image/gambar_01.png"
                width={100}
                height={100}
                alt="ilustrasi aplikasi"
            />
            <div className="flex gap-1">
                <CategoryBadge />
            </div>
            <CardTitle className="truncate mb-2">Jalan simpang kepri mengalami kerusakan jalan</CardTitle>
            <CardDescription className="text-sm lineclamp-2 mb-2">Lorem ipsum dolor sit amet consectetur. Eu blandit leo etiam aliquam posuere</CardDescription>
        </Card>
    )
}

export default ListLaporanSection;