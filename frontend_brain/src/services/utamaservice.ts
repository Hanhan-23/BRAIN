import api from '../lib/axios'
import { CardLaporanItem } from '../types/utamatype'

export async function getCardLaporanUtama(): Promise<CardLaporanItem[]> {
    const res = await api.get<CardLaporanItem[]>('/cardslaporan');
    return res.data
}