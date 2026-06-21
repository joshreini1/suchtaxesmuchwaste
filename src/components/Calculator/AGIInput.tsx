
import React, { useState, useCallback, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from '../../utils/calculatorUtils';

interface AGIInputProps {
  onAGIChange: (agi: number) => void;
}

const AGIInput: React.FC<AGIInputProps> = ({ onAGIChange }) => {
  const [currentValue, setCurrentValue] = useState(100000);
  const [debouncedValue, setDebouncedValue] = useState(100000);

  // Update debounced value after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(currentValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [currentValue]);

  // Only trigger the parent callback when the debounced value changes
  useEffect(() => {
    onAGIChange(debouncedValue);
  }, [debouncedValue, onAGIChange]);

  const handleSliderChange = useCallback((value: number[]) => {
    const agiValue = value[0];
    setCurrentValue(agiValue);
  }, []);

  return (
    <div className="mb-8 space-y-6">
      <label className="block text-sm font-medium text-gray-500">
        Your Adjusted Gross Income (AGI)
      </label>
      <div className="text-2xl font-semibold text-gray-900">
        {formatCurrency(currentValue)}
      </div>
      <div className="px-4">
        <Slider
          defaultValue={[100000]}
          max={500000}
          step={1000}
          onValueChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default AGIInput;
