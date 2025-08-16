
import { CopyButton } from './CopyButton';

interface RangeRowProps {
  label: string;
  value: string;
  epoch: number;
  className?: string;
}

export function RangeRow({ label, value, epoch, className = '' }: RangeRowProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-gray-800 text-lg">{label}:</div>
        <div className="text-right flex items-center gap-3">
          <div>
            <div className="font-mono text-base text-gray-700 font-medium">{value}</div>
            <div className="text-sm text-blue-600 font-medium">epoch: {epoch}</div>
          </div>
          <div className="flex flex-col gap-1">
            <CopyButton text={value} />
            <CopyButton text={epoch.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
}
