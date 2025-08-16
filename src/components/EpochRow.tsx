import { CopyButton } from './CopyButton';

interface EpochRowProps {
  label: string;
  epoch: number;
  className?: string;
}

export function EpochRow({ label, epoch, className = '' }: EpochRowProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-gray-800 text-lg">{label}:</div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-2xl font-bold text-blue-600">
            {epoch}
          </div>
          <CopyButton text={epoch.toString()} />
        </div>
      </div>
    </div>
  );
}
