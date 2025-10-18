'use client';

import { useState } from 'react';

interface ElegantSpinWheelProps {
  onSpinComplete: (reward: string) => void;
  isLocked: boolean;
}

const ElegantSpinWheel = ({ onSpinComplete, isLocked }: ElegantSpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segments = [
    { text: 'Gel Polish Add-On', value: '$20 Value', color: 'black' },
    { text: 'Hydration Package', value: '$15 Value', color: 'white' },
    { text: '$10 Gift Card', value: 'Off Purchase', color: 'black' },
    { text: 'Nail Design', value: 'Up to $15', color: 'white' },
    { text: 'Elite Package', value: '$25 Value', color: 'black' },
    { text: '25% Discount', value: 'Total Bill', color: 'white' },
  ];

  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    if (isSpinning || isLocked) return;

    setIsSpinning(true);
    
    const minRotation = 1440;
    const maxRotation = 2520;
    const randomRotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    const newRotation = rotation + randomRotation;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = newRotation % 360;
      const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
      onSpinComplete(`${segments[segmentIndex].text} (${segments[segmentIndex].value})`);
    }, 4500);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-8 lg:px-16">
      <div className="max-w-xl mx-auto w-full text-center">
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 border-2 border-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-black rounded-sm"></div>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-black mb-3">
                Entry Required
              </h3>
              <p className="text-sm text-gray-600 tracking-wide">
                Please complete the registration form to participate
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-black mb-4 tracking-tight">
            Exclusive Rewards
          </h2>
          <div className="elegant-divider mb-6"></div>
          <p className="text-gray-600 text-sm uppercase tracking-wider font-light">
            Six distinguished prizes
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-12">
          {/* Pointer */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-black" />
          </div>

          {/* Wheel */}
          <div 
            className={`relative w-80 h-80 lg:w-96 lg:h-96 rounded-full border-4 border-black ${
              isLocked ? 'opacity-40' : ''
            }`}
            style={{
              background: '#ffffff',
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-black border-4 border-white flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-white text-xs uppercase tracking-widest font-medium">Aventus</div>
                <div className="text-white text-xs uppercase tracking-widest font-medium">Spa</div>
              </div>
            </div>

            {/* Segments */}
            {segments.map((segment, index) => {
              const rotation = index * segmentAngle;
              const isBlack = segment.color === 'black';
              
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle - 90) * Math.PI / 180)}%)`,
                  }}
                >
                  <div className={`w-full h-full ${isBlack ? 'bg-black' : 'bg-white'}`}>
                    {/* Segment Text */}
                    <div
                      className={`absolute ${isBlack ? 'text-white' : 'text-black'} text-center`}
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${rotation + segmentAngle / 2}deg) translateY(-130px)`,
                        transformOrigin: 'center',
                        width: '100px',
                      }}
                    >
                      <div className="text-xs font-medium tracking-wide leading-tight">
                        {segment.text}
                      </div>
                      <div className="text-[10px] opacity-70 mt-1 tracking-wider">
                        {segment.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || isLocked}
          className={`px-12 py-4 bg-black text-white text-sm uppercase tracking-widest font-medium hover:bg-gray-900 transition-all duration-300 border border-black disabled:opacity-30 disabled:cursor-not-allowed ${
            isLocked ? 'cursor-not-allowed' : ''
          }`}
        >
          {isLocked ? 'Entry Required' : isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </button>

        {/* Prize List */}
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-4 text-left">
            {segments.map((seg, i) => (
              <div key={i} className="border-b border-gray-200 pb-3">
                <div className="text-xs font-medium text-black tracking-wide">{seg.text}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{seg.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantSpinWheel;

