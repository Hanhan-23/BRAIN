import { Card, CardTitle, CardDescription } from "../ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { CardLaporanItemUtama } from "@/types/utamatype";

interface ListLayout {
    className: any;
    item: CardLaporanItemUtama[];
}

const ListLaporan: React.FC<ListLayout> =  ({className, item}) => {
    return (
        <>
            <p className="text-3xl font-semibold mb-2 md:block md:text-3xl lg:text-5xl">Daftar Laporan Terkini</p>
            <div className="flex flex-col gap-4">
                <div className={className}>
                    {item.map((laporan) => (
                        <CardLaporan key={laporan.id_laporan} laporan={laporan} />
                    ))}
                </div>
            </div>
        </>
    )
}

const CategoryBadge = ({ laporan }: { laporan: CardLaporanItemUtama }) => {
    let jenis = laporan.jenis;

    if (laporan.jenis === 'jalan') {
        jenis = 'Jalan Rusak';
    } else if (laporan.jenis === 'lampu_jalan') {
        jenis = 'Lampu Jalan';
    } else if (laporan.jenis === 'jembatan') {
        jenis = 'Jembatan';
    }

    return (
        <div className="
            bg-blue-200 text-blue-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block
            md:text-[10px] lg:py-1 lg:text-xs
        ">
            {jenis ?? 'Tidak ada jenis'}
        </div>
    )
}


const CardLaporan = ({ laporan }: { laporan: CardLaporanItemUtama }) => {
    return (
        <Card className="col-span-1 p-3 rounded-3xl gap-y-1">
            <Image
                className="w-full rounded-xl md:mb-1.5"
                src={`http://localhost:8000/media/${laporan.gambar}`}
                width={100}
                height={100}
                alt="ilustrasi aplikasi"
            />
            <div className="flex gap-1 mb-1">
                <CategoryBadge laporan={laporan}/>
            </div>
            <CardTitle className="text-base truncate">{laporan.judul?.trim() || 'Tidak ada judul'}</CardTitle>
            <CardDescription className="text-[10px] line-clamp-2 mb-2 md:text-xs lg:text-sm">{laporan.deskripsi?.trim() || 'Tidak ada deskripsi'}</CardDescription>
        </Card>
    )
}

export default ListLaporan;