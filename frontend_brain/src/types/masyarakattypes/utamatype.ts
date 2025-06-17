export interface CardLaporanItemUtama {
    id_laporan: number;
    gambar:string;
    jenis:string;
    judul:string;
    deskripsi:string;
}

export interface CardRekomendasiItemUtama {
    id_rekomendasi: number;
    tingkat_urgent: number;
    status_urgent: string;
    gambar_laporan: string;
    judul_laporan: string;
    jenis: string;
    alamat:string;
}

export interface StatistikLaporanUtama {
    date: string;
    laporanmasuk: number;
    laporanvalid: number;
}