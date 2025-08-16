import { useState, useEffect } from 'react';
import { EpochRow } from './components/EpochRow';
import { CopyButton } from './components/CopyButton';
import { InputDateComponent } from './components/InputDateComponent';
import { DateTimeInputComponent } from './components/DateTimeInputComponent';
import { DateTimeRangeInput } from './components/DateTimeRangeInput';
import { TimezoneSelector } from './components/TimezoneSelector';
import {
  TIMEZONE_OPTIONS,
  getCurrentEpoch,
  formatEpochToHuman,
  formatHumanToEpoch,
  getStartEndOfPeriod,
  getCurrentWeekInfo,
  parseEpochInput,
  parseDateTimeLocal
} from './utils/time';
import { generateCodeSnippets } from './utils/codeSnippets';

function App() {
  // State management
  const [currentEpoch, setCurrentEpoch] = useState(getCurrentEpoch());
  const [selectedTimezone, setSelectedTimezone] = useState('local');
  
  // Epoch to Human module
  const [epochInput, setEpochInput] = useState('');
  const [epochUnit, setEpochUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [epochTimezone, setEpochTimezone] = useState(selectedTimezone);
  
  // Human to Epoch module
  const [humanDateTime, setHumanDateTime] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    };
  });
  const [humanTimezone, setHumanTimezone] = useState(selectedTimezone);
  
  // Start/End module
  const [startEndDate, setStartEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [startEndPeriod, setStartEndPeriod] = useState<'year' | 'month' | 'day'>('day');
  const [startEndTimezone, setStartEndTimezone] = useState(selectedTimezone);
  
  // Custom Range module - default to first day of current month to current time
  const [customStart, setCustomStart] = useState(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return `${firstDayOfMonth.toISOString().split('T')[0]}T00:00:00`;
  });
  const [customEnd, setCustomEnd] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  });
  const [customRangeTimezone, setCustomRangeTimezone] = useState(selectedTimezone);
  
  // Code snippets
  const [activeCodeLanguage, setActiveCodeLanguage] = useState('JavaScript');

  // Update current epoch every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(getCurrentEpoch());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Computed values
  const weekInfo = getCurrentWeekInfo(selectedTimezone);
  const epochToHumanResult = epochInput ? 
    formatEpochToHuman(
      parseEpochInput(epochInput, epochUnit) || 0, 
      epochTimezone, 
      epochUnit
    ) : 
    { readable: '', iso: '', isValid: true };

  const humanToEpochResult = formatHumanToEpoch(
    humanDateTime.year, humanDateTime.month, humanDateTime.day, humanDateTime.hour, humanDateTime.minute, humanDateTime.second, humanTimezone
  );

  const startEndResult = getStartEndOfPeriod(startEndDate, startEndPeriod, startEndTimezone);
  
  // Convert datetime strings
  const customStartDt = customStart ? parseDateTimeLocal(customStart, customRangeTimezone) : null;
  const customEndDt = customEnd ? parseDateTimeLocal(customEnd, customRangeTimezone) : null;

  const codeSnippets = generateCodeSnippets(
    parseEpochInput(epochInput, epochUnit) || currentEpoch,
    selectedTimezone
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative text-center mb-8">
          <div className="absolute top-0 right-0">
            <a
              href="https://github.com/cengfanman/epoch-converter-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Epoch Converter — Dev Edition
          </h1>
          <p className="text-gray-600">An Epoch Converter for Developers</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
            {/* Top Info Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="mb-4 sm:mb-0">
                  <p className="text-xl flex items-center gap-3">
                    The current Unix epoch time is <span className="font-mono font-bold text-blue-600 text-2xl">{currentEpoch}</span>
                    <CopyButton text={currentEpoch.toString()} />
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {TIMEZONE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-gray-600">
                Today is <span className="font-semibold">{weekInfo.weekYear}</span> week <span className="font-semibold">{weekInfo.weekNumber}</span> ({weekInfo.dateString} in selected zone)
              </p>
            </div>

            {/* Module 1: Epoch → Human */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Epoch → Human</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Epoch Input</label>
                  <input
                    type="text"
                    value={epochInput}
                    onChange={(e) => setEpochInput(e.target.value)}
                    placeholder="Enter epoch time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Unit</label>
                  <select
                    value={epochUnit}
                    onChange={(e) => setEpochUnit(e.target.value as 'seconds' | 'milliseconds')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px]"
                  >
                    <option value="seconds">seconds</option>
                    <option value="milliseconds">milliseconds</option>
                  </select>
                </div>
                <div>
                  <TimezoneSelector 
                    value={epochTimezone} 
                    onChange={setEpochTimezone} 
                    label="Timezone"
                  />
                </div>
              </div>
              {epochInput && (
                <div className="space-y-2">
                  {epochToHumanResult.isValid ? (
                    <>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                        <div className="font-mono text-lg font-semibold text-blue-800">{epochToHumanResult.readable}</div>
                        <CopyButton text={epochToHumanResult.readable} />
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                        <div className="font-mono text-base text-gray-700">{epochToHumanResult.iso}</div>
                        <CopyButton text={epochToHumanResult.iso} />
                      </div>
                    </>
                  ) : (
                    <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                      <p className="text-yellow-800">Invalid epoch input</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Module 2: Human → Epoch */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Human → Epoch</h2>
              <p className="text-sm text-gray-600 mb-4">Enter date and time in 24-hour format</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="lg:col-span-2">
                  <DateTimeInputComponent
                    value={humanDateTime}
                    onChange={setHumanDateTime}
                    label="Date & Time"
                  />
                </div>
                <div className="flex flex-col">
                  <TimezoneSelector 
                    value={humanTimezone} 
                    onChange={setHumanTimezone} 
                    label="Timezone"
                    className="mt-[20px]"
                  />
                </div>
              </div>
              {humanToEpochResult.isValid ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <p className="text-green-800 text-lg">
                    Epoch seconds: <span className="font-mono font-bold text-xl text-green-900">{humanToEpochResult.epoch}</span>
                  </p>
                  <CopyButton text={humanToEpochResult.epoch.toString()} />
                </div>
              ) : (
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                  <p className="text-yellow-800">Invalid date/time combination</p>
                </div>
              )}
            </div>

            {/* Module 3: Start/End */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Start/End (Year/Month/Day)</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                <div className="lg:col-span-2">
                  <InputDateComponent
                    label="Date"
                    value={startEndDate}
                    onChange={setStartEndDate}
                    min="1970-01-01"
                    max="2099-12-31"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Period</label>
                  <select
                    value={startEndPeriod}
                    onChange={(e) => setStartEndPeriod(e.target.value as 'year' | 'month' | 'day')}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px] mt-[20px]"
                  >
                    <option value="year">year</option>
                    <option value="month">month</option>
                    <option value="day">day</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <TimezoneSelector 
                    value={startEndTimezone} 
                    onChange={setStartEndTimezone} 
                    label="Timezone"
                    className="mt-[20px]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <EpochRow
                  label="Start"
                  epoch={Math.floor(startEndResult.start.toSeconds())}
                />
                <EpochRow
                  label="End"
                  epoch={Math.floor(startEndResult.end.toSeconds())}
                />
              </div>
            </div>

            {/* Module 4: Custom Range */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Range</h2>
              <p className="text-sm text-gray-600 mb-4">Select date and time range (defaults to current month: 1st 00:00:00 to now)</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                <DateTimeRangeInput
                  label="Start Date & Time"
                  value={customStart}
                  onChange={setCustomStart}
                />
                <DateTimeRangeInput
                  label="End Date & Time"
                  value={customEnd}
                  onChange={setCustomEnd}
                />
                <div className="flex flex-col">
                  <TimezoneSelector 
                    value={customRangeTimezone} 
                    onChange={setCustomRangeTimezone} 
                    label="Timezone"
                    className="mt-[20px]"
                  />
                </div>
              </div>
              {customStartDt && customEndDt && (
                <div className="space-y-4">
                  <EpochRow
                    label="Custom Start"
                    epoch={Math.floor(customStartDt.toSeconds())}
                  />
                  <EpochRow
                    label="Custom End"
                    epoch={Math.floor(customEndDt.toSeconds())}
                  />
                </div>
              )}
            </div>
          
          {/* Code Snippets Section - Moved to bottom */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Code Snippets</h2>
            
            {/* Language Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {codeSnippets.map((snippet) => (
                <button
                  key={snippet.language}
                  onClick={() => setActiveCodeLanguage(snippet.language)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCodeLanguage === snippet.language
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {snippet.language}
                </button>
              ))}
            </div>
            
            {/* Active Code Display */}
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                <code>{codeSnippets.find(s => s.language === activeCodeLanguage)?.code}</code>
              </pre>
              <button
                onClick={async () => {
                  const code = codeSnippets.find(s => s.language === activeCodeLanguage)?.code;
                  if (code) {
                    try {
                      await navigator.clipboard.writeText(code);
                    } catch (err) {
                      console.error('Failed to copy code:', err);
                    }
                  }
                }}
                className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded hover:bg-gray-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      
        {/* FAQ Section */}
        <section id="faq" className="bg-white rounded-2xl shadow-sm p-6 border mt-8">
        <h2 className="text-lg font-semibold mb-4">FAQ — Epoch / Unix Timestamp</h2>

        <details className="mb-3">
          <summary className="font-medium cursor-pointer">What is an epoch (Unix) timestamp?</summary>
          <p className="mt-2 text-sm text-neutral-700">
            An epoch (Unix) timestamp is the number of seconds since 1970-01-01T00:00:00Z. It's widely used by developers for storing and comparing time.
          </p>
        </details>

        <details className="mb-3">
          <summary className="font-medium cursor-pointer">How to convert epoch to a human-readable date?</summary>
          <p className="mt-2 text-sm text-neutral-700">
            Enter your value in seconds or milliseconds and pick a timezone (UTC, US Eastern, US Pacific, Asia/Shanghai). The converter renders a readable date and ISO format instantly.
          </p>
        </details>

        <details className="mb-3">
          <summary className="font-medium cursor-pointer">Code examples for JavaScript, Go, Python, Java, MySQL?</summary>
          <p className="mt-2 text-sm text-neutral-700">
            Use the <strong>Code Snippets</strong> sidebar for ready-to-copy conversions in JavaScript (Luxon), Go (<code>time</code>), Python (<code>datetime + zoneinfo</code>), Java (<code>java.time</code>), and MySQL (<code>FROM_UNIXTIME</code> / <code>CONVERT_TZ</code>).
          </p>
        </details>

        <details className="mb-3">
          <summary className="font-medium cursor-pointer">Is any backend involved?</summary>
          <p className="mt-2 text-sm text-neutral-700">
            No. This is a lightweight, 100% in-browser epoch converter. No servers, no external APIs, no tracking.
          </p>
        </details>

        <details>
          <summary className="font-medium cursor-pointer">Start/end of year/month/day and custom range?</summary>
          <p className="mt-2 text-sm text-neutral-700">
            Yes. The tool computes epoch for the start and end of a selected year, month, or day, and also supports a custom date-time range.
          </p>
        </details>
        </section>
        </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Epoch Converter — Dev Edition</h3>
            <p className="text-gray-600 mb-4">
              A powerful, client-side epoch time converter designed for developers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>100% Client-Side • No Backend Required</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>Feature requests: </span>
                <a 
                  href="mailto:ilovexuu2024@gmail.com?subject=Epoch Converter - Feature Request" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  ilovexuu2024@gmail.com
                </a>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Built with React • TypeScript • Vite • Tailwind CSS • Luxon.js
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
