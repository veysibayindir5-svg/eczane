import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Europe/Istanbul';

export function getTurkeyDate(): Date {
    return toZonedTime(new Date(), TIMEZONE);
}

export function isDutyTime(): boolean {
    const now = getTurkeyDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Custom logic: Duty time is 19:30 - 08:30
    // So if it is 19:30 or later, OR before 08:30, it is duty time.

    const totalMinutes = hours * 60 + minutes;
    const startDuty = 19 * 60 + 30; // 19:30 -> 1170
    const endDuty = 8 * 60 + 30;    // 08:30 -> 510

    // Examples: 
    // 20:00 -> 1200 > 1170 (True)
    // 05:00 -> 300 < 510 (True)
    // 12:00 -> 720 (False)

    return totalMinutes >= startDuty || totalMinutes < endDuty;
}

export function formatTime(date: Date): string {
    return formatInTimeZone(date, TIMEZONE, 'HH:mm');
}

import { tr } from 'date-fns/locale';

export function formatDisplayDate(date: Date): string {
    return formatInTimeZone(date, TIMEZONE, 'd MMMM yyyy, EEEE', { locale: tr });
}
