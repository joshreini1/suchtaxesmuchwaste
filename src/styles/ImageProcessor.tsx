
import { useRef } from 'react';

const ImageProcessor: React.FC = () => {
  const originalImage = '/lovable-uploads/8fb05a72-3546-4e49-9c8d-8babb0ec0d6c.png';
  
  return (
    <div className="flex justify-center mb-8">
      <img src={originalImage} alt="Doge" className="w-32 h-32 object-contain" />
    </div>
  );
};

export default ImageProcessor;
