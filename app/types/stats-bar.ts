export interface StatBarItem {
  id: string;
  value: string;
  label: string;
  // When the value is a number-based stat (e.g. "10K+"), set these so the
  // display can count up on scroll instead of just appearing as static
  // text — omit both for a purely text stat (e.g. "Imported").
  numericValue?: number;
  suffix?: string;
}
