import { DateTime } from 'luxon';

export const TIMEZONE_OPTIONS = [
  { value: 'local', label: 'Local time' },
  { value: 'UTC', label: 'UTC (GMT)' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai' },
  { value: 'Europe/London', label: 'Europe/London' },
];

export function resolveZone(tz: string): string {
  if (tz === 'local') {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return tz;
}

export function getCurrentEpoch(): number {
  return Math.floor(DateTime.now().toSeconds());
}

export function formatEpochToHuman(
  epoch: number,
  timezone: string,
  unit: 'seconds' | 'milliseconds' = 'seconds'
): { readable: string; iso: string; isValid: boolean } {
  try {
    let dt: DateTime;
    if (unit === 'milliseconds') {
      dt = DateTime.fromMillis(epoch, { zone: resolveZone(timezone) });
    } else {
      dt = DateTime.fromSeconds(epoch, { zone: resolveZone(timezone) });
    }

    if (!dt.isValid) {
      return { readable: '', iso: '', isValid: false };
    }

    const readable = dt.setLocale('en').toFormat('ccc, dd LLL yyyy HH:mm:ss ZZZZ');
    const iso = dt.toISO({ suppressMilliseconds: true }) || '';

    return { readable, iso, isValid: true };
  } catch {
    return { readable: '', iso: '', isValid: false };
  }
}

export function formatHumanToEpoch(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timezone: string
): { epoch: number; isValid: boolean } {
  try {
    const dt = DateTime.fromObject(
      { year, month, day, hour, minute, second },
      { zone: resolveZone(timezone) }
    );

    if (!dt.isValid) {
      return { epoch: 0, isValid: false };
    }

    return { epoch: Math.floor(dt.toSeconds()), isValid: true };
  } catch {
    return { epoch: 0, isValid: false };
  }
}

export function getStartEndOfPeriod(
  date: string,
  period: 'year' | 'month' | 'day',
  timezone: string
): { start: DateTime; end: DateTime } {
  const dt = DateTime.fromISO(date, { zone: resolveZone(timezone) });
  
  const start = dt.startOf(period);
  const end = dt.endOf(period);
  
  return { start, end };
}

export function formatDateTimeForDisplay(dt: DateTime): string {
  return dt.setLocale('en').toFormat('ccc, dd LLL yyyy HH:mm:ss ZZZZ');
}

export function getCurrentWeekInfo(timezone: string): { weekYear: number; weekNumber: number; dateString: string } {
  const now = DateTime.now().setZone(resolveZone(timezone));
  return {
    weekYear: now.weekYear,
    weekNumber: now.weekNumber,
    dateString: now.setLocale('en').toFormat('yyyy-MM-dd HH:mm')
  };
}

export function parseEpochInput(input: string, _unit: 'seconds' | 'milliseconds'): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  
  const parsed = parseFloat(trimmed);
  if (isNaN(parsed)) return null;
  
  // Return the parsed value as-is, formatEpochToHuman will handle the unit conversion
  return Math.floor(parsed);
}

export function parseDateTimeLocal(value: string, timezone: string): DateTime | null {
  if (!value) return null;
  
  try {
    // Handle both 'YYYY-MM-DDTHH:MM' and 'YYYY-MM-DDTHH:MM:SS' formats
    let isoString = value;
    if (value.length === 16) {
      // Add seconds if not provided
      isoString = value + ':00';
    }
    
    // Parse the datetime-local input as if it's in the selected timezone
    const dt = DateTime.fromISO(isoString, { zone: resolveZone(timezone) });
    return dt.isValid ? dt : null;
  } catch {
    return null;
  }
}
