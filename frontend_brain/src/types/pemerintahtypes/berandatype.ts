export interface empatAnalisis {
    total_laporan_terkini: number;
	total_rekomendasi_terkini: number;
	total_rekomendasi_valid: number;
	total_rekomendasi_belumvalid: number;
}

export interface rekomendasiBerandaPemerintah {
	id_rekomendasi: number;
	status: string;
	status_urgent: string;
	id_laporan: number;
	judul: string;
	gambar:string;
	alamat: string;
	cluster: number;
	total_laporan_cluster: number
}