# Epoch Converter — Dev Edition

A comprehensive epoch/Unix timestamp converter built for developers with React + TypeScript + Vite + Tailwind + Luxon.

## Features

- **Real-time Epoch Display**: Current Unix epoch time with auto-refresh
- **Timezone Support**: Local time and major IANA timezones
- **Epoch ↔ Human Conversion**: Convert between epoch timestamps and human-readable dates
- **Date Range Tools**: Start/End period calculations and custom datetime ranges
- **Code Snippets**: Dynamic code generation for JavaScript, Go, Java, Python, and MySQL
- **Responsive Design**: Works on desktop and mobile devices
- **Pure Frontend**: No backend or external APIs - all calculations in browser

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Timezone Selection**: Choose your preferred timezone from the dropdown
2. **Epoch → Human**: Enter epoch time (seconds/milliseconds) for conversion
3. **Human → Epoch**: Use date/time inputs to get epoch timestamp
4. **Start/End Periods**: Select date and period type for range calculations
5. **Custom Range**: Use datetime-local inputs for precise ranges
6. **Code Snippets**: Click language tabs to see implementation examples

## Technical Details

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Date/Time**: Luxon library for timezone handling
- **Features**: ISO week calculations, DST handling, 2038-safe operations

## Browser Support

Modern browsers with ES2020+ support and native Intl API.

## License

MIT
# epoch-converter-dev
