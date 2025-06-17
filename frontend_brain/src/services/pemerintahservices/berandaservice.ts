import api from '@/lib/axios'
import { empatAnalisis, rekomendasiBerandaPemerintah } from '@/types/pemerintahtypes/berandatype'

export async function getEmpatAnalisis({access_token} : {access_token: string}) {
    const res = await api.get<empatAnalisis>('/berandapemerintah/analisis', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data
}

export async function RekomendasiBerandaPemerintah({access_token} : {access_token: string}): Promise <rekomendasiBerandaPemerintah[]> {
    const res = await api.get<rekomendasiBerandaPemerintah[]>('/berandapemerintah/rekomendasi', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data
}