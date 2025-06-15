import { Card, CardTitle, CardDescription } from "../ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { CardRekomendasiItemUtama } from "@/types/utamatype";

interface ListLayout {
    className: any;
    item: CardRekomendasiItemUtama[];
}

const ListRekomendasi: React.FC<ListLayout> =  ({className, item}) => {
    return (
        <>
            <p className="text-3xl font-semibold mb-2 md:block md:text-3xl lg:text-5xl">Daftar Rekomendasi</p>
            <div className="flex flex-col gap-4">
                <div className={className}>
                    {item.map((rekomendasi) => (
                        <CardLaporan key={rekomendasi.id_rekomendasi} rekomendasi={rekomendasi}/>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button showButton={false} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Lihat semua</Button>
                </div>
            </div>
        </>
    )
}

const CategoryBadge = ({ rekomendasi } : { rekomendasi: CardRekomendasiItemUtama }) => {

    let jenis = rekomendasi.jenis

    if (jenis === 'jalan') {
        jenis = 'Jalan Rusak';
    } else if (jenis === 'lampu_jalan') {
        jenis = 'Lampu Jalan';
    } else if (jenis === 'jembatan') {
        jenis = 'Jembatan';
    }

    return (
        <div className="
            bg-blue-200 text-blue-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block
            md:text-[10px] lg:py-1 lg:text-xs
        ">
            {jenis}
        </div>
    )
}

const LevelBadge = ({ rekomendasi } : { rekomendasi: CardRekomendasiItemUtama }) => {

    let status = rekomendasi.status_urgent

    if (status === 'tinggi') {
        status = 'Tinggi'
    } else if (status === 'sedang') {
        status = 'Sedang'
    } else if (status === 'rendah') {
        status = 'Rendah'
    }

    return (
        <div className="
            bg-red-200 text-red-600 py-0.5 px-1.5 text-[8px] text-nowrap rounded-full inline-block
            md:text-[10px] lg:py-1 lg:text-xs
        ">
            {status}
        </div>
    )
}

const CardLaporan = ({ rekomendasi } : { rekomendasi: CardRekomendasiItemUtama }) => {
    return (
        <Card className="col-span-1 p-2 md:p-3 gap-y-1 rounded-3xl">
            <Image
                className="w-full rounded-xl mb-2"
                src={`http://localhost:8000/media/${rekomendasi.gambar_laporan}`}
                width={100}
                height={100}
                alt="ilustrasi aplikasi"
            />
            <div className="flex flex-wrapt gap-1 mb-1">
                <CategoryBadge rekomendasi={rekomendasi}/>
                <LevelBadge rekomendasi={rekomendasi}/>
            </div>
            <CardTitle className="text-base truncate md:text-sm">{rekomendasi.judul_laporan || 'Tidak ada judul'}</CardTitle>
            <CardDescription className="text-[10px] line-clamp-2 md:mb-2 md:text-xs lg:text-sm">{rekomendasi.alamat || 'Tidak ada alamat'}</CardDescription>
        </Card>
    )
}

export default ListRekomendasi;