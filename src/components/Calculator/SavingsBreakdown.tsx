import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { ContributionResult } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import { calculateEffectiveTaxRate, calculateTotalTax, FilingStatus } from '../../utils/taxBrackets';
import FilingStatusToggle from './FilingStatusToggle';

interface SavingsBreakdownProps {
  contributions: ContributionResult[];
  filingStatus: FilingStatus;
  onFilingStatusChange: (status: FilingStatus) => void;
}

const SavingsBreakdown: React.FC<SavingsBreakdownProps> = ({
  contributions,
  filingStatus,
  onFilingStatusChange
}) => {
  const [spendingChangePercent, setSpendingChangePercent] = useState(-5);

  const agi = contributions[0]?.originalAGI || 0;
  const totalTax = calculateTotalTax(agi, filingStatus);
  const effectiveTaxRate = calculateEffectiveTaxRate(agi, totalTax);
  const annualImpact = -(totalTax * (spendingChangePercent / 100));
  const monthlyImpact = annualImpact / 12;
  const isSavings = annualImpact >= 0;

  const handleSpendingChange = (value: number[]) => {
    setSpendingChangePercent(value[0]);
  };

  if (totalTax === 0) return null;

  return (
    <div className="space-y-6 fade-up">
      <FilingStatusToggle value={filingStatus} onChange={onFilingStatusChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-black/10">
          <div className="text-sm font-medium text-gray-500 mb-1">Estimated Federal Income Tax</div>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalTax)}</div>
          <div className="text-sm text-gray-500 mt-1">
            Effective tax rate: <span className="font-medium">{effectiveTaxRate.toFixed(1)}%</span>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-black/10">
          <div className="text-sm font-medium text-gray-500 mb-1">Estimated Bottom-Line Impact</div>
          <div className={`text-3xl font-bold ${isSavings ? 'text-green-600' : 'text-red-600'}`}>
            {isSavings ? '+' : '-'}{formatCurrency(Math.abs(annualImpact))}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {isSavings ? 'Savings' : 'Added cost'} of {formatCurrency(Math.abs(monthlyImpact))} per month
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-black/10 bg-white space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-black">Federal Spending Change</h2>
            <p className="text-sm text-gray-500 mt-1">
              Assumes your federal tax bill moves proportionally with the spending change.
            </p>
          </div>
          <div className={`text-2xl font-bold ${spendingChangePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {spendingChangePercent > 0 ? '+' : ''}{spendingChangePercent.toFixed(1)}%
          </div>
        </div>

        <div className="px-1">
          <Slider
            value={[spendingChangePercent]}
            min={-25}
            max={25}
            step={0.5}
            onValueChange={handleSpendingChange}
            aria-label="Federal spending percentage change"
          />
        </div>

        <div className="flex justify-between text-xs font-medium text-gray-500">
          <span>25% less spending</span>
          <span>No change</span>
          <span>25% more spending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-black/10 bg-white/70 p-4">
          <div className="text-sm font-medium text-gray-500">Annual impact</div>
          <div className={`mt-1 text-2xl font-semibold ${isSavings ? 'text-green-600' : 'text-red-600'}`}>
            {isSavings ? '+' : '-'}{formatCurrency(Math.abs(annualImpact))}
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white/70 p-4">
          <div className="text-sm font-medium text-gray-500">Monthly impact</div>
          <div className={`mt-1 text-2xl font-semibold ${isSavings ? 'text-green-600' : 'text-red-600'}`}>
            {isSavings ? '+' : '-'}{formatCurrency(Math.abs(monthlyImpact))}
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white/70 p-4">
          <div className="text-sm font-medium text-gray-500">New implied tax bill</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {formatCurrency(totalTax - annualImpact)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsBreakdown;
