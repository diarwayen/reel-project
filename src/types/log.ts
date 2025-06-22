export interface Log {
  id: string;
  timestamp: string;
  level: string;
  thread: string;
  file: string;
  caller: string;
  message: string;
  info?: string;
}

export interface ParsedLog {
  timestamp: string;
  level: string;
  thread: string;
  file: string;
  caller: string;
  message: string;
}