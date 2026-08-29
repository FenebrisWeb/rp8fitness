export interface FranchiseStatItem {
  id: string;
  value: string;
  label: string;
  // Set for number-based stats so the value can count up on scroll instead
  // of appearing as static text — omit for purely text stats.
  numericValue?: number;
  suffix?: string;
}
