interface TimezoneSelectorProps {
  value: string;
  onChange: (timezone: string) => void;
  className?: string;
  label?: string;
}

export function TimezoneSelector({ value, onChange, className = '', label }: TimezoneSelectorProps) {
  const timezones = [
    { value: 'Local time', label: 'Local time' },
    { value: 'UTC', label: 'UTC (GMT)' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai' },
    { value: 'Europe/London', label: 'Europe/London' },
  ];

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-bold text-blue-700 mb-1">
          {label}
        </label>
      )}
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px]"
      >
        {timezones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
    </div>
  );
}
