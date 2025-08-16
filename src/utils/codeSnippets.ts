import { resolveZone } from './time';

export interface CodeSnippet {
  language: string;
  code: string;
}

export function generateCodeSnippets(
  epochSeconds: number | null,
  timezone: string
): CodeSnippet[] {
  const resolvedZone = resolveZone(timezone);
  const epoch = epochSeconds || Math.floor(Date.now() / 1000);

  return [
    {
      language: 'JavaScript',
      code: `// Using Luxon
import { DateTime } from 'luxon';

// From epoch seconds
const dt = DateTime.fromSeconds(${epoch}, { zone: '${resolvedZone}' });
console.log(dt.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'));

// To epoch seconds
const now = DateTime.now().setZone('${resolvedZone}');
console.log(now.toSeconds()); // ${epoch}

// From object
const custom = DateTime.fromObject(
  { year: 2024, month: 1, day: 1, hour: 12, minute: 0, second: 0 },
  { zone: '${resolvedZone}' }
);
console.log(custom.toSeconds());`
    },
    {
      language: 'Go',
      code: `package main

import (
    "fmt"
    "time"
)

func main() {
    // From epoch seconds
    t := time.Unix(${epoch}, 0)
    loc, _ := time.LoadLocation("${resolvedZone}")
    localTime := t.In(loc)
    fmt.Println(localTime.Format("2006-01-02 15:04:05 -0700"))
    
    // To epoch seconds
    now := time.Now().In(loc)
    fmt.Println(now.Unix()) // ${epoch}
    
    // From components
    custom := time.Date(2024, 1, 1, 12, 0, 0, 0, loc)
    fmt.Println(custom.Unix())
}`
    },
    {
      language: 'Java',
      code: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class EpochConverter {
    public static void main(String[] args) {
        // From epoch seconds
        Instant instant = Instant.ofEpochSecond(${epoch});
        ZoneId zone = ZoneId.of("${resolvedZone}");
        ZonedDateTime zdt = instant.atZone(zone);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss ZZZZ");
        System.out.println(zdt.format(formatter));
        
        // To epoch seconds
        ZonedDateTime now = ZonedDateTime.now(zone);
        System.out.println(now.toEpochSecond()); // ${epoch}
        
        // From components
        ZonedDateTime custom = ZonedDateTime.of(2024, 1, 1, 12, 0, 0, 0, zone);
        System.out.println(custom.toEpochSecond());
    }
}`
    },
    {
      language: 'Python',
      code: `from datetime import datetime
from zoneinfo import ZoneInfo

# From epoch seconds
dt = datetime.fromtimestamp(${epoch}, ZoneInfo('${resolvedZone}'))
print(dt.strftime('%Y-%m-%d %H:%M:%S %z'))

# To epoch seconds
now = datetime.now(ZoneInfo('${resolvedZone}'))
print(int(now.timestamp()))  # ${epoch}

# From components
custom = datetime(2024, 1, 1, 12, 0, 0, tzinfo=ZoneInfo('${resolvedZone}'))
print(int(custom.timestamp()))`
    },
    {
      language: 'MySQL',
      code: `-- From epoch seconds to formatted time
SELECT CONVERT_TZ(FROM_UNIXTIME(${epoch}), 'UTC', '${resolvedZone}') AS local_time;

-- To epoch seconds from formatted time
SELECT UNIX_TIMESTAMP(
    CONVERT_TZ('2024-01-01 12:00:00', '${resolvedZone}', 'UTC')
) AS epoch_seconds;

-- Current epoch
SELECT UNIX_TIMESTAMP() AS current_epoch;

-- Using in queries with parameters
-- CONVERT_TZ(FROM_UNIXTIME(:timestamp), 'UTC', '${resolvedZone}')
-- UNIX_TIMESTAMP(CONVERT_TZ(:datetime, '${resolvedZone}', 'UTC'))`
    }
  ];
}
