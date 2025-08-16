import { useState, useEffect } from 'react';

interface DateTimeInputComponentProps {
  value: { year: number; month: number; day: number; hour: number; minute: number; second: number };
  onChange: (value: { year: number; month: number; day: number; hour: number; minute: number; second: number }) => void;
  label?: string;
  className?: string;
}

export function DateTimeInputComponent({ value, onChange, label, className = '' }: DateTimeInputComponentProps) {
  const [year, setYear] = useState(value.year.toString());
  const [month, setMonth] = useState(value.month.toString());
  const [day, setDay] = useState(value.day.toString());
  const [hour, setHour] = useState(value.hour.toString());
  const [minute, setMinute] = useState(value.minute.toString());
  const [second, setSecond] = useState(value.second.toString());

  // Update local state when props change
  useEffect(() => {
    setYear(value.year.toString());
    setMonth(value.month.toString());
    setDay(value.day.toString());
    setHour(value.hour.toString());
    setMinute(value.minute.toString());
    setSecond(value.second.toString());
  }, [value]);

  // Update parent when any field changes
  useEffect(() => {
    const yearNum = parseInt(year, 10) || 0;
    const monthNum = parseInt(month, 10) || 0;
    const dayNum = parseInt(day, 10) || 0;
    const hourNum = parseInt(hour, 10) || 0;
    const minuteNum = parseInt(minute, 10) || 0;
    const secondNum = parseInt(second, 10) || 0;

    if (yearNum > 0 && monthNum > 0 && dayNum > 0) {
      onChange({
        year: yearNum,
        month: monthNum,
        day: dayNum,
        hour: hourNum,
        minute: minuteNum,
        second: secondNum
      });
    }
  }, [year, month, day, hour, minute, second, onChange]);

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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
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
        <div>
          <label className="text-xs text-gray-500">Hour</label>
          <input
            type="text"
            value={hour}
            onChange={handleHourChange}
            placeholder="HH"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Min</label>
          <input
            type="text"
            value={minute}
            onChange={handleMinuteChange}
            placeholder="MM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Sec</label>
          <input
            type="text"
            value={second}
            onChange={handleSecondChange}
            placeholder="SS"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] text-center"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD HH:MM:SS (24-hour format, all inputs)</p>
    </div>
  );
}
