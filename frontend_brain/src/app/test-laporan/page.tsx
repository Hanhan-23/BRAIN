'use client'

import { useEffect } from 'react';
import { getCardLaporanUtama } from '@/services/utamaservice';

export default function TestLaporanPage() {
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCardLaporanUtama();
                console.log('Data berhasil diambil:', data);
            } catch (error) {
                console.error('Gagal mengambil data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Testing Ambil Data</h1>
            <p>Lihat console browser untuk hasilnya.</p>
        </div>
    );
}
