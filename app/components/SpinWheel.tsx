'use client';

import { useState } from 'react';

interface SpinWheelProps {
  onSpinComplete: (reward: string) => void;
}

const SpinWheel = ({ onSpinComplete }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segments = [
    { text: '$500', color: 'bg-gradient-to-br from-gray-900 to-black' },
    { text: '$50', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { text: '$200', color: 'bg-gradient-to-br from-gray-900 to-black' },
    { text: '$25', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { text: '$1000', color: 'bg-gradient-to-br from-gray-900 to-black' },
    { text: '$75', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { text: '$300', color: 'bg-gradient-to-br from-gray-900 to-black' },
    { text: '$100', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { text: '$250', color: 'bg-gradient-to-br from-gray-900 to-black' },
    { text: '$150', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
  ];

  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Random rotations between 1080deg (3 rounds) and 1800deg (5 rounds)
    const minRotation = 1080;
    const maxRotation = 1800;
    const randomRotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    const newRotation = rotation + randomRotation;
    
    setRotation(newRotation);

    // After animation completes (3 seconds), show the result
    setTimeout(() => {
      setIsSpinning(false);
      // Determine which segment won based on final rotation
      const normalizedRotation = newRotation % 360;
      const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
      onSpinComplete(segments[segmentIndex].text);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Fixed Pointer */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-black drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <div 
          className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
          }}
        >
          {/* Glossy highlight overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-lg flex items-center justify-center z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border-2 border-white/20">
              <div className="text-center">
                <div className="text-white font-bold text-xs sm:text-sm">BONUS</div>
                <div className="text-white font-bold text-xs sm:text-sm">COUPONS</div>
              </div>
            </div>
          </div>

          {/* Segments */}
          {segments.map((segment, index) => {
            const rotation = index * segmentAngle;
            const isBlack = segment.color.includes('gray-900');
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle - 90) * Math.PI / 180)}%)`,
                }}
              >
                <div className={`w-full h-full ${segment.color}`}>
                  {/* Segment Text */}
                  <div
                    className={`absolute ${isBlack ? 'text-white' : 'text-gray-900'} font-bold text-base sm:text-lg`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${rotation + segmentAngle / 2}deg) translateY(-130px)`,
                      transformOrigin: 'center',
                    }}
                  >
                    {segment.text}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Inner shadow for depth */}
          <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="px-8 py-4 bg-gradient-to-r from-gray-800 to-black text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSpinning ? 'Spinning...' : 'SPIN NOW'}
      </button>

      {/* Aventus Spa Branding */}
      <div className="text-center mt-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent">
          Aventus Spa
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">Premium Nail Salon Experience</p>
      </div>
    </div>
  );
};

export default SpinWheel;
