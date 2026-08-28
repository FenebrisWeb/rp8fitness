// A feature row's value per plan — `true`/`false` render as a check or a
// dash, a string renders as-is (e.g. "1 / Week", "Unlimited").
export type CompareCellValue = boolean | string;

export interface ComparePlansRow {
  id: string;
  label: string;
  values: CompareCellValue[];
}

export interface ComparePlansContent {
  eyebrow: string;
  planNames: string[];
  popularIndex: number;
  rows: ComparePlansRow[];
}
