import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { tr } from 'date-fns/locale';

const TIMEZONE = 'Europe/Istanbul';

export function getTurkeyDate(): Date {
    return toZonedTime(new Date(), TIMEZONE);
}

/**
 * Mesai dışı (nöbet) zamanı:
 * 19:30 – 08:30
 */
export function isDutyTime(): boolean {
    const now = getTurkeyDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const totalMinutes = hours * 60 + minutes;
    const startDuty = 19 * 60 + 30; // 19:30
    const endDuty = 8 * 60 + 30;    // 08:30

    return totalMinutes >= startDuty || totalMinutes < endDuty;
}

export function formatTime(date: Date): string {
    return formatInTimeZone(date, TIMEZONE, 'HH:mm');
}

export function formatDisplayDate(date: Date): string {
    return formatInTimeZone(date, TIMEZONE, 'd MMMM yyyy, EEEE', { locale: tr });
}

/**
 * 🔑 NÖBET GÜNÜ HESABI
 * Gün 08:00'de değişir
 * 00:00 – 07:59 => önceki günün nöbeti gösterilir
 */
export function getDutyDate(): Date {
    const now = getTurkeyDate();
    const dutyDate = new Date(now);

    if (dutyDate.getHours() < 8) {
        dutyDate.setDate(dutyDate.getDate() - 1);
    }

    dutyDate.setHours(0, 0, 0, 0);
    return dutyDate;
}
