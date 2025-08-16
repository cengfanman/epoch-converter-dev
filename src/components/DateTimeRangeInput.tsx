import { useState, useEffect } from 'react';

interface DateTimeRangeInputProps {
  value: string; // YYYY-MM-DDTHH:MM:SS format
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function DateTimeRangeInput({ value, onChange, label, className = '' }: DateTimeRangeInputProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  // Parse initial value
  const parseValue = (val: string) => {
    if (!val) return { y: '', m: '', d: '', h: '', min: '', s: '' };
    
    const [datePart, timePart] = val.split('T');
    const [y, m, d] = datePart.split('-');
    const [h, min, s] = (timePart || '00:00:00').split(':');
    
    return {
      y: y || '',
      m: m || '',
      d: d || '',
      h: h || '',
      min: min || '',
      s: s || ''
    };
  };

  // Update states when value changes
  useEffect(() => {
    const parsed = parseValue(value);
    setYear(parsed.y);
    setMonth(parsed.m);
    setDay(parsed.d);
    setHour(parsed.h);
    setMinute(parsed.min);
    setSecond(parsed.s);
  }, [value]);

  // Update parent when date/time changes
  useEffect(() => {
    if (year && month && day && hour !== '' && minute !== '' && second !== '') {
      // Validate inputs
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      const hourNum = parseInt(hour, 10);
      const minuteNum = parseInt(minute, 10);
      const secondNum = parseInt(second, 10);
      
      if (yearNum >= 1970 && yearNum <= 2099 && 
          monthNum >= 1 && monthNum <= 12 && 
          dayNum >= 1 && dayNum <= 31 &&
          hourNum >= 0 && hourNum <= 23 &&
          minuteNum >= 0 && minuteNum <= 59 &&
          secondNum >= 0 && secondNum <= 59) {
        const formattedDateTime = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
        if (formattedDateTime !== value) {
          onChange(formattedDateTime);
        }
      }
    }
  }, [year, month, day, hour, minute, second, onChange, value]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val, 10) >= 1 && parseInt(val, 10) <= 12)) {
      setMonth(val);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val, 10) >= 1 && parseInt(val, 10) <= 31)) {
      setDay(val);
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val, 10) >= 0 && parseInt(val, 10) <= 23)) {
      setHour(val);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val, 10) >= 0 && parseInt(val, 10) <= 59)) {
      setMinute(val);
    }
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    if (val === '' || (parseInt(val, 10) >= 0 && parseInt(val, 10) <= 59)) {
      setSecond(val);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div>
          <label className="text-xs text-gray-500">Year</label>
          <input
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="YYYY"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Month</label>
          <input
            type="text"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Day</label>
          <input
            type="text"
            value={day}
            onChange={handleDayChange}
            placeholder="DD"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs text-gray-500">Hour (24h)</label>
          <input
            type="text"
            value={hour}
            onChange={handleHourChange}
            placeholder="HH"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Minute</label>
          <input
            type="text"
            value={minute}
            onChange={handleMinuteChange}
            placeholder="MM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Second</label>
          <input
            type="text"
            value={second}
            onChange={handleSecondChange}
            placeholder="SS"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD HH:MM:SS (Input)</p>
    </div>
  );
}
