import { useState, useEffect } from 'react';

interface InputDateComponentProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function InputDateComponent({ value, onChange, label, className = '' }: InputDateComponentProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // Parse initial value
  const parseValue = (val: string) => {
    if (!val) return { y: '', m: '', d: '' };
    const [y, m, d] = val.split('-');
    return {
      y: y || '',
      m: m || '',
      d: d || ''
    };
  };


  
  // Update states when value changes
  useEffect(() => {
    const parsed = parseValue(value);
    setYear(parsed.y);
    setMonth(parsed.m);
    setDay(parsed.d);
  }, [value]);

  // Update parent when date changes
  useEffect(() => {
    if (year && month && day) {
      // Validate inputs
      const yearNum = parseInt(year, 10);
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      
      if (yearNum >= 1970 && yearNum <= 2099 && 
          monthNum >= 1 && monthNum <= 12 && 
          dayNum >= 1 && dayNum <= 31) {
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        if (formattedDate !== value) {
          onChange(formattedDate);
        }
      }
    }
  }, [year, month, day, onChange, value]);

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

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="grid grid-cols-3 gap-2">
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
      <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD (Input)</p>
    </div>
  );
}
