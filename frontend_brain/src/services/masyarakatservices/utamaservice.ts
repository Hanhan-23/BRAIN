import api from '@/lib/axios'
import { CardLaporanItemUtama, CardRekomendasiItemUtama, StatistikLaporanUtama } from '@/types/masyarakattypes/utamatype'

export async function getCardLaporanUtama(): Promise<CardLaporanItemUtama[]> {
    const res = await api.get<CardLaporanItemUtama[]>('/cardslaporan');
    return res.data
}

export async function getCardRekomendasiUtama(): Promise<CardRekomendasiItemUtama[]> {
    const res = await api.get<CardRekomendasiItemUtama[]>('/cardsrekomendasi');
    return res.data
}

export async function statistikLaporanUtama(): Promise<StatistikLaporanUtama[]> {
    const res = await api.get<StatistikLaporanUtama[]>('/statistiklaporan');
    return res.data
}