
// Tax brackets for 2025 for different filing statuses
export type FilingStatus = 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold';

export const TAX_BRACKETS_BY_STATUS = {
  // Single Filers
  single: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 }
  ],
  
  // Married Filing Jointly or Qualifying Widow
  marriedJoint: [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 }
  ],
  
  // Married Filing Separately
  marriedSeparate: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 375800, rate: 0.35 },
    { min: 375800, max: Infinity, rate: 0.37 }
  ],
  
  // Head of Household
  headOfHousehold: [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 }
  ]
};

// For backwards compatibility - default to single
export const TAX_BRACKETS = TAX_BRACKETS_BY_STATUS.single;

// Calculate total tax based on progressive brackets
export const calculateTotalTax = (agi: number, filingStatus: FilingStatus = 'single'): number => {
  let totalTax = 0;
  let remainingIncome = agi;
  
  // Get the appropriate tax brackets for the filing status
  const brackets = TAX_BRACKETS_BY_STATUS[filingStatus];

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const nextBracketMin = i < brackets.length - 1 ? brackets[i + 1].min : Infinity;
    
    // Calculate how much income falls into this bracket
    const incomeInThisBracket = Math.min(remainingIncome, nextBracketMin - bracket.min);
    
    if (incomeInThisBracket <= 0) {
      break; // No more income to tax
    }
    
    // Calculate tax for this portion
    const taxForBracket = incomeInThisBracket * bracket.rate;
    totalTax += taxForBracket;
    
    // Subtract the income we just taxed
    remainingIncome -= incomeInThisBracket;
    
    console.log(`Bracket ${i+1}: min=${bracket.min}, max=${nextBracketMin-1}, rate=${bracket.rate*100}%, income in bracket=${incomeInThisBracket}, tax=${taxForBracket}`);
    
    if (remainingIncome <= 0) {
      break; // No more income to tax
    }
  }

  // Log tax calculation details
  console.log(`Total tax calculated: ${totalTax} for AGI: ${agi}, filing status: ${filingStatus}, effective rate: ${(totalTax / agi * 100).toFixed(2)}%`);
  return totalTax;
};

// Calculate effective tax rate (as a percentage)
export const calculateEffectiveTaxRate = (agi: number, totalTax: number): number => {
  if (agi <= 0) return 0;
  return (totalTax / agi) * 100;
};
