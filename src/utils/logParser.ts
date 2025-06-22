export interface ParsedLog {
  timestamp: string;
  level: string;
  thread: string;
  file: string;
  caller: string;
  message: string;
}

export function parseLogLine(line: string): ParsedLog | null {
  // Example: 2024-06-01T12:34:56.789Z INFO thread-1 app.js doSomething "This is a log message"
  const regex = /^(\S+) (\S+) (\S+) (\S+) (\S+) "(.*)"$/;
  const match = line.match(regex);
  if (!match) return null;
  const [, timestamp, level, thread, file, caller, message] = match;
  return { timestamp, level, thread, file, caller, message };
}