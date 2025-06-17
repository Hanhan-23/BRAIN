'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { getCardRekomendasiUtama } from '@/services/masyarakatservices/utamaservice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function TestLaporanPage() {
    const router = useRouter();

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

    const login = useGoogleLogin({
        scope: 'openid email profile',
        flow: 'implicit', 
        onSuccess: (tokenResponse) => {
            console.log('Login success: ', tokenResponse.access_token);
            router.push('/dashboard');
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    return (
        <div>
            <h1>Testing Ambil Data</h1>
            <p>Lihat console browser untuk hasilnya.</p>

            <Button onClick={() => login()}>
                Tes Login
            </Button>
        </div>
    );
}
