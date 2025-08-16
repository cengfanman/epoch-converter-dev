import { useState, useEffect } from 'react';

interface CustomDateInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  min?: string;
  max?: string;
}

export function CustomDateInput({ value, onChange, label, className = '', min, max }: CustomDateInputProps) {
  // Initialize states with parsed value
  const parseValue = (val: string) => {
    if (!val) return { y: '', m: '', d: '' };
    const [y, m, d] = val.split('-');
    return {
      y: y || '',
      m: m ? parseInt(m, 10).toString() : '',
      d: d ? parseInt(d, 10).toString() : ''
    };
  };

  const initialState = parseValue(value);
  const [year, setYear] = useState(initialState.y);
  const [month, setMonth] = useState(initialState.m);
  const [day, setDay] = useState(initialState.d);

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
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      if (formattedDate !== value) {
        onChange(formattedDate);
      }
    }
  }, [year, month, day, onChange, value]);

  const minYear = min ? parseInt(min.split('-')[0]) : 1970;
  const maxYear = max ? parseInt(max.split('-')[0]) : 2099;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  };

  const daysInMonth = year && month ? getDaysInMonth(parseInt(year), parseInt(month)) : 31;

  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {/* Year */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">YYYY</option>
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">MM</option>
            {monthNames.map((name, index) => (
              <option key={index + 1} value={index + 1}>
                {String(index + 1).padStart(2, '0')} - {name}
              </option>
            ))}
          </select>
        </div>

        {/* Day */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">DD</option>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>
                {String(d).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Format: YYYY-MM-DD (English)
      </div>
    </div>
  );
}
