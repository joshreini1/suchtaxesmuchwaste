
export interface Program {
  id: string;
  name: string;
  description: string;
  icon: string;
  department: string;
  percentage: number;
  color: string;
}

export interface ContributionResult {
  program: Program;
  amount: number;
  originalAGI?: number; // Added to store the AGI for tax rate calculations
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface EfficiencySaving {
  id?: string; // Making id optional
  name: string;
  description: string;
  amount: number;
  href?: string;
}

export interface WastefulSpending {
  id: string;
  name: string;
  description: string;
  amount: number;
  category: string;
  agency: string;
  href?: string; // Added href property to match usage in wastefulSpending.ts
}
