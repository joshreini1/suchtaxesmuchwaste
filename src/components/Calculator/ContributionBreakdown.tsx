
import React, { useState } from 'react';
import { ContributionResult, WastefulSpending } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContributionBreakdownProps {
  contributions: ContributionResult[];
}

const ContributionBreakdown: React.FC<ContributionBreakdownProps> = ({ contributions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalContribution = contributions.reduce((sum, item) => sum + item.amount, 0);
  
  // This component is now deprecated in favor of SavingsBreakdown
  // Leaving minimal implementation to avoid build errors
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-sm font-medium text-gray-500">Your Federal Income Tax</div>
        <div className="text-3xl font-bold text-black">{formatCurrency(totalContribution)}</div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {contributions.map((item, index) => (
          <div
            key={item.program.name}
            className="contribution-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="stat-label text-black">{item.program.name}</h3>
            <p className="stat-value text-green-600">{formatCurrency(item.amount)}</p>
            <p className="text-sm text-gray-500">{item.program.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionBreakdown;
