import { useState, useEffect } from 'react';
import { CustomDateInput } from './CustomDateInput';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export function DateTimePicker({ value, onChange, label, className = '' }: DateTimePickerProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Parse initial value
  useEffect(() => {
    if (value) {
      const [datePart, timePart] = value.split('T');
      setDate(datePart || '');
      setTime(timePart || '');
    }
  }, [value]);

  // Update parent when date or time changes
  useEffect(() => {
    if (date && time) {
      onChange(`${date}T${time}`);
    } else if (date) {
      onChange(`${date}T00:00`);
    } else {
      onChange('');
    }
  }, [date, time, onChange]);

  return (
    <div className={className}>
      <div className="space-y-3">
        <CustomDateInput
          label={label}
          value={date}
          onChange={setDate}
          min="1970-01-01"
          max="2099-12-31"
        />
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            step="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="HH:MM:SS"
            lang="en"
            data-locale="en"
          />
          <div className="text-xs text-gray-500 mt-1">
            Format: HH:MM:SS (24-hour)
          </div>
        </div>
      </div>
    </div>
  );
}
