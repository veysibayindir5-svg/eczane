import type { MonthlyData, Pharmacy } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

export async function fetchMonthlyData(yearMonth: string): Promise<MonthlyData | null> {
    try {
        const response = await fetch(`${BASE_URL}data/${yearMonth}.json`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch monthly data:', error);
        return null;
    }
}

export async function fetchAllPharmacies(): Promise<Pharmacy[]> {
    try {
        const response = await fetch(`${BASE_URL}data/eczaneler.json`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch pharmacies list:', error);
        return [];
    }
}
