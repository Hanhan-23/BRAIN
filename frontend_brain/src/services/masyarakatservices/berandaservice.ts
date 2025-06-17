import api from '@/lib/axios'
import { CardLaporanHistory } from '@/types/masyarakattypes/berandatype'

export async function getHistoryLaporan({access_token} : {access_token: string}): Promise<CardLaporanHistory[]> {
    const res = await api.get<CardLaporanHistory[]>('/laporan/history', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data
}