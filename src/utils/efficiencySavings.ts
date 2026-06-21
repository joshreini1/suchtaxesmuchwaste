
import { EfficiencySaving } from '../types/calculator';
import efficiencySavingsData from '../data/efficiency-savings.json';

// Constants for calculations
const TOTAL_GOVERNMENT_SAVINGS = 65000000000; // $65 billion
const TOTAL_FEDERAL_INCOME_TAX_REVENUE = 823000000000; // $823 billion

// Memoization cache to avoid recalculating the same values
let cachedTotalContribution: number | null = null;
let cachedSavings: EfficiencySaving[] | null = null;

// This function fetches data from the local JSON file
export const fetchEfficiencySavings = async (totalContribution: number): Promise<EfficiencySaving[]> => {
  console.log('Loading efficiency savings data for contribution:', totalContribution);
  
  // If we already calculated for this contribution, return cached result
  if (cachedTotalContribution === totalContribution && cachedSavings) {
    console.log('Using cached efficiency savings data');
    return cachedSavings;
  }
  
  try {
    // Use the locally stored data instead of scraping
    const data = efficiencySavingsData;
    
    // Process the data into the required format
    const combinedSavings: EfficiencySaving[] = [];
    
    // Limit the number of items to improve performance
    const MAX_CONTRACTS = 100; // Increased from 30 to 100
    const MAX_LEASES = 50; // Increased from 20 to 50
    
    // Process contracts (limited to improve performance)
    if (data.contracts && Array.isArray(data.contracts)) {
      // Sort contracts by value to show the most significant ones
      const sortedContracts = [...data.contracts].sort((a, b) => b.value - a.value).slice(0, MAX_CONTRACTS);
      
      sortedContracts.forEach((contract: any, index: number) => {
        // Calculate the amount based on user's contribution and the contract's value
        const scaledAmount = totalContribution * (contract.value / TOTAL_GOVERNMENT_SAVINGS);
        
        // Only add if the amount is significant enough (avoid extremely small values)
        if (scaledAmount >= 0.01) {
          combinedSavings.push({
            id: `contract-${contract.piid || index}`,
            name: `${contract.description || `Contract: ${contract.piid}`}_${index}`,
            amount: scaledAmount,
            description: `${contract.agency}: ${contract.description || 'Government efficiency contract'}`,
            href: contract.fpds_link || `https://doge.gov/receipts/${contract.piid}`
          });
        }
      });
    }
    
    // Process leases (limited to improve performance)
    if (data.leases && Array.isArray(data.leases)) {
      // Sort leases by value to show the most significant ones
      const sortedLeases = [...data.leases].sort((a, b) => {
        // Fix: Use value property instead of annual_savings
        const valueA = parseFloat(a.value) || 0;
        const valueB = parseFloat(b.value) || 0;
        return valueB - valueA;
      }).slice(0, MAX_LEASES);
      
      sortedLeases.forEach((lease: any, index: number) => {
        // Calculate the amount based on the lease's value
        // Fix: Use value property instead of annual_savings
        const leaseValue = parseFloat(lease.value) || 0;
        const scaledAmount = totalContribution * (leaseValue / TOTAL_GOVERNMENT_SAVINGS);
        
        // Only add if the amount is significant enough
        if (scaledAmount >= 0.01) {
          combinedSavings.push({
            id: `lease-${lease.building_number || index}`,
            name: `${lease.description || `Lease: ${lease.building_number}`}_${index}`,
            amount: scaledAmount,
            description: `${lease.agency}: ${lease.description || 'Property lease optimization'}`,
            href: `https://doge.gov/savings/lease/${lease.building_number}`
          });
        }
      });
    }
    
    // Update cache
    cachedTotalContribution = totalContribution;
    cachedSavings = combinedSavings;
    
    console.log(`Generated ${combinedSavings.length} efficiency savings items from raw data`);
    
    return combinedSavings;
  } catch (error) {
    console.error('Error loading efficiency savings data:', error);
    // Return empty array if there's an error
    return [];
  }
};
