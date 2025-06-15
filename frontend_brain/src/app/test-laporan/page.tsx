'use client'

import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { getCardRekomendasiUtama } from '@/services/utamaservice';

export default function TestLaporanPage() {
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCardRekomendasiUtama();
                console.log('Data berhasil diambil:', data);
            } catch (error) {
                console.error('Gagal mengambil data:', error);
            }
        }

        fetchData();
    }, []);

    const handleLoginSuccess = (credentialResponse: any) => {
        console.log('Login success: ', credentialResponse);
        // Di sini kamu kirimkan access_token Google ke Django
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <div>
            <h1>Testing Ambil Data</h1>
            <p>Lihat console browser untuk hasilnya.</p>

            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
            />
        </div>
    );
}
