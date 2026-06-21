
import { Program, ContributionResult } from '../types/calculator';
import { governmentPrograms } from './governmentPrograms';
import { fetchEfficiencySavings } from './efficiencySavings';
import { TAX_BRACKETS, calculateTotalTax, calculateEffectiveTaxRate, FilingStatus } from './taxBrackets';

// Memoization cache for contribution calculations
// Use a compound key of AGI and filing status
const contributionsCache = new Map<string, ContributionResult[]>();

// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Calculate federal tax using proper tax brackets
const calculateFederalTax = (agi: number, filingStatus: FilingStatus): number => {
  console.log(`Calculating federal tax for AGI: ${agi}, Filing Status: ${filingStatus}`);
  
  if (agi <= 0) {
    console.log("AGI is zero or negative, no tax.");
    return 0;
  }
  
  const tax = calculateTotalTax(agi, filingStatus);
  const effectiveRate = calculateEffectiveTaxRate(agi, tax);
  console.log(`Federal tax for AGI ${formatCurrency(agi)} (${filingStatus}): ${formatCurrency(tax)} (${effectiveRate.toFixed(2)}% effective rate)`);
  return tax;
};

// Generate cache key
const getCacheKey = (agi: number, filingStatus: FilingStatus): string => {
  return `${agi}-${filingStatus}`;
};

// This is now an async function that calculates contributions
export const calculateContributions = async (
  agi: number, 
  filingStatus: FilingStatus = 'single',
  useSyncFallback: boolean = false
): Promise<ContributionResult[]> => {
  // Round AGI to nearest 100 to improve caching
  const roundedAgi = Math.round(Math.max(0, Number(agi)) / 100) * 100;
  const cacheKey = getCacheKey(roundedAgi, filingStatus);
  
  // Check if we have cached results
  if (contributionsCache.has(cacheKey)) {
    console.log(`Using cached contributions for AGI: ${roundedAgi}, Filing Status: ${filingStatus}`);
    return contributionsCache.get(cacheKey)!;
  }
  
  console.log(`Processing contributions for AGI: ${roundedAgi}, Filing Status: ${filingStatus}`);
  
  // Calculate federal tax based on AGI and filing status
  const federalTax = calculateFederalTax(roundedAgi, filingStatus);
  
  console.log(`Calculated federal tax: ${formatCurrency(federalTax)} for AGI: ${formatCurrency(roundedAgi)}, Filing Status: ${filingStatus}`);
  
  // Use default tax rate if tax calculation fails
  if (federalTax === 0 && roundedAgi > 0) {
    console.warn('Tax calculation resulted in $0 tax. Using default rate.');
    const results = useSyncFallback 
      ? calculateSyncContributions(roundedAgi, filingStatus) 
      : Promise.resolve(calculateSyncContributions(roundedAgi, filingStatus));
    
    if (!useSyncFallback) {
      contributionsCache.set(cacheKey, await results);
    }
    
    return results;
  }
  
  // If using synchronous fallback, skip async operations
  if (useSyncFallback) {
    const results = calculateSyncContributions(roundedAgi, filingStatus);
    contributionsCache.set(cacheKey, results);
    return results;
  }

  // Get data from external sources
  try {
    // Calculate the contributions based on the government programs
    const contributions = governmentPrograms.map((program: Program) => {
      // Calculate the exact amount based on the percentage
      const amount = Math.round((federalTax * (program.percentage / 100)) * 100) / 100;
      return { 
        program, 
        amount,
        originalAGI: roundedAgi  // Store the original AGI for accurate effective rate calculations
      };
    });
    
    console.log('Calculated contributions:', contributions);
    
    // Cache the results
    contributionsCache.set(cacheKey, contributions);
    
    return contributions;
  } catch (error) {
    console.error("Error in async data fetching:", error);
    // Fallback to synchronous calculation if async fails
    const results = calculateSyncContributions(roundedAgi, filingStatus);
    contributionsCache.set(cacheKey, results);
    return results;
  }
};

// Synchronous fallback calculation
const calculateSyncContributions = (agi: number, filingStatus: FilingStatus): ContributionResult[] => {
  const federalTax = calculateFederalTax(agi, filingStatus);
  
  return governmentPrograms.map((program: Program) => {
    const amount = Math.round((federalTax * (program.percentage / 100)) * 100) / 100;
    return { 
      program, 
      amount,
      originalAGI: agi  // Store the original AGI for accurate effective rate calculations
    };
  });
};
