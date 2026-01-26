export interface Pharmacy {
    ad: string;
    il: string;
    ilce: string;
    mahalle: string;
    adres: string;
    telefon: string;
    whatsapp?: string;
    maps: string;
    saat?: string;
    kart?: boolean;
    sgk?: boolean;
    nobetci?: boolean; // For display purposes
}

export interface MonthlyData {
    month: string;
    days: {
        [date: string]: Pharmacy[];
    };
}
