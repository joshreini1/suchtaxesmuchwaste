
import React, { useState, useEffect, useCallback } from 'react';
import AGIInput from '../components/Calculator/AGIInput';
import SavingsBreakdown from '../components/Calculator/SavingsBreakdown';
import { calculateContributions } from '../utils/calculatorUtils';
import { ContributionResult } from '../types/calculator';
import { Button } from '../components/ui/button';
import { Coffee } from 'lucide-react';
import ImageProcessor from '../styles/ImageProcessor';
import { useToast } from '../hooks/use-toast';
import { FilingStatus } from '../utils/taxBrackets';

const Index = () => {
  const [contributions, setContributions] = useState<ContributionResult[]>([]);
  const [currentAGI, setCurrentAGI] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const { toast } = useToast();

  const handleAGIChange = useCallback(async (agi: number) => {
    console.log(`Processing AGI change to: ${agi}`);
    setCurrentAGI(agi);
    
    if (agi === 0) {
      setContributions([]);
      return;
    }
    
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Pass the AGI and filing status to the calculation function
      const newContributions = await calculateContributions(agi, filingStatus);
      console.log('New contributions calculated:', newContributions);
      setContributions(newContributions);
    } catch (error) {
      console.error('Error calculating contributions:', error);
      setHasError(true);
      toast({
        title: "Calculation Error",
        description: "There was a problem estimating your federal tax. Trying a simpler calculation instead.",
        variant: "destructive"
      });
      // Use synchronous calculation as fallback
      try {
        const fallbackContributions = await calculateContributions(agi, filingStatus, true);
        setContributions(fallbackContributions);
      } catch (fallbackError) {
        console.error('Error with fallback calculation:', fallbackError);
        setContributions([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast, filingStatus]);

  // Recalculate when filing status changes
  useEffect(() => {
    if (currentAGI > 0) {
      handleAGIChange(currentAGI);
    }
  }, [filingStatus, handleAGIChange, currentAGI]);

  const handleFilingStatusChange = (status: FilingStatus) => {
    console.log(`Filing status changed to: ${status}`);
    setFilingStatus(status);
  };

  const handleBuyMeCoffee = () => {
    window.open('https://www.buymeacoffee.com/muchwaste', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/5 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 sm:px-6">
        {currentAGI === 0 && <ImageProcessor />}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Such Taxes, Much Waste
          </h1>
          <p className="mt-4 text-lg text-black">
            See the personal side of Federal spending.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-sm border border-black/10">
          <AGIInput onAGIChange={handleAGIChange} />
          
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="h-4 bg-black/10 rounded w-3/4"></div>
                <div className="h-4 bg-black/10 rounded w-1/2"></div>
                <div className="h-4 bg-black/10 rounded w-2/3"></div>
                <div className="h-4 bg-black/10 rounded w-1/4"></div>
              </div>
              <p className="mt-4 text-sm text-black/70">Estimating your federal income tax...</p>
            </div>
          ) : hasError ? (
            <div className="py-8 text-center">
              <p className="text-red-500">There was a problem estimating your tax.</p>
              <Button 
                onClick={() => handleAGIChange(currentAGI)} 
                variant="outline" 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : (
            contributions.length > 0 && (
              <SavingsBreakdown 
                contributions={contributions} 
                filingStatus={filingStatus}
                onFilingStatusChange={handleFilingStatusChange}
              />
            )
          )}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={handleBuyMeCoffee}
            variant="outline"
            className="hover:bg-black/5"
          >
            <Coffee className="mr-2" />
            Buy me a coffee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
