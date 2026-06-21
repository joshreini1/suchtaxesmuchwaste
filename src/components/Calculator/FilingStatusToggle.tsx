
import React from 'react';
import { FilingStatus } from '../../utils/taxBrackets';
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface FilingStatusToggleProps {
  value: FilingStatus;
  onChange: (value: FilingStatus) => void;
}

const FilingStatusToggle: React.FC<FilingStatusToggleProps> = ({ value, onChange }) => {
  // Function to handle toggle change with type safety
  const handleValueChange = (newValue: string) => {
    if (newValue && (newValue === 'single' || newValue === 'marriedJoint' || 
        newValue === 'marriedSeparate' || newValue === 'headOfHousehold')) {
      onChange(newValue as FilingStatus);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">Filing Status</h3>
      <ToggleGroup 
        type="single" 
        value={value} 
        onValueChange={handleValueChange} 
        className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full"
      >
        <ToggleGroupItem 
          value="single" 
          aria-label="Single" 
          className="w-full data-[state=on]:ring-2 data-[state=on]:ring-green-500 data-[state=on]:border-green-500 data-[state=on]:bg-green-50"
        >
          <span className="font-medium">Single</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="marriedJoint" 
          aria-label="Married Filing Jointly" 
          className="w-full data-[state=on]:ring-2 data-[state=on]:ring-green-500 data-[state=on]:border-green-500 data-[state=on]:bg-green-50"
        >
          <span className="font-medium">Married Joint</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="marriedSeparate" 
          aria-label="Married Filing Separately" 
          className="w-full data-[state=on]:ring-2 data-[state=on]:ring-green-500 data-[state=on]:border-green-500 data-[state=on]:bg-green-50"
        >
          <span className="font-medium">Married Separate</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="headOfHousehold" 
          aria-label="Head of Household" 
          className="w-full data-[state=on]:ring-2 data-[state=on]:ring-green-500 data-[state=on]:border-green-500 data-[state=on]:bg-green-50"
        >
          <span className="font-medium">Head of Household</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default FilingStatusToggle;
