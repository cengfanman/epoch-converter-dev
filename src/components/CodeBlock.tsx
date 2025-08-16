import React from 'react';

interface CodeBlockProps {
  language: string;
  code: string;
  isActive: boolean;
  onClick: () => void;
}

export function CodeBlock({ language, code, isActive, onClick }: CodeBlockProps) {
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="h-full">
      <button
        onClick={onClick}
        className={`w-full px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {language}
      </button>
      {isActive && (
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
            <code>{code}</code>
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-gray-600 transition-colors"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
