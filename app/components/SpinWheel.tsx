'use client';

import { useState } from 'react';

interface SpinWheelProps {
  onSpinComplete: (reward: string) => void;
  isLocked: boolean;
}

const SpinWheel = ({ onSpinComplete, isLocked }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segments = [
    { text: 'Gel Polish Add-On', subtext: '($20)', color: 'from-pink-400 to-pink-500', textColor: 'text-white' },
    { text: 'Hydration Package', subtext: '($15)', color: 'from-gray-100 to-gray-200', textColor: 'text-gray-900' },
    { text: '$10 Off Gift Card', subtext: '', color: 'from-purple-400 to-purple-500', textColor: 'text-white' },
    { text: 'Free Nail Design', subtext: '(up to $15)', color: 'from-gray-100 to-gray-200', textColor: 'text-gray-900' },
    { text: 'Elite Package', subtext: '($25)', color: 'from-indigo-400 to-indigo-500', textColor: 'text-white' },
    { text: '25% Off Total Bill', subtext: '', color: 'from-gray-100 to-gray-200', textColor: 'text-gray-900' },
  ];

  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    if (isSpinning || isLocked) return;

    setIsSpinning(true);
    
    const minRotation = 1440; // 4 rounds
    const maxRotation = 2160; // 6 rounds
    const randomRotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    const newRotation = rotation + randomRotation;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = newRotation % 360;
      const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
      onSpinComplete(segments[segmentIndex].text);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl z-30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl text-center">
            <div className="text-5xl mb-3">🔒</div>
            <p className="text-xl font-bold text-gray-900 mb-2">Fill the form to unlock!</p>
            <p className="text-sm text-gray-600">Complete your information to spin the wheel</p>
          </div>
        </div>
      )}

      {/* Wheel Container */}
      <div className="relative">
        {/* Fixed Pointer */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-600 drop-shadow-2xl" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full -mt-1" />
          </div>
        </div>

        {/* Wheel */}
        <div 
          className={`relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full shadow-2xl ${
            isLocked ? 'opacity-50' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {/* Glossy highlight overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />

          {/* Outer Border */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-800" />

          {/* Inner Border */}
          <div className="absolute inset-4 rounded-full border-4 border-gray-300" />

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl flex items-center justify-center z-10 border-4 border-white">
            <div className="text-center">
              <div className="text-white font-bold text-lg sm:text-xl">SPIN</div>
              <div className="text-white font-bold text-lg sm:text-xl">TO WIN</div>
              <div className="text-yellow-400 text-2xl mt-1">✨</div>
            </div>
          </div>

          {/* Segments */}
          {segments.map((segment, index) => {
            const rotation = index * segmentAngle;
            
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle - 90) * Math.PI / 180)}%)`,
                }}
              >
                <div className={`w-full h-full bg-gradient-to-br ${segment.color}`}>
                  {/* Segment Text */}
                  <div
                    className={`absolute font-bold ${segment.textColor}`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${rotation + segmentAngle / 2}deg) translateY(-145px)`,
                      transformOrigin: 'center',
                      width: '120px',
                      textAlign: 'center',
                    }}
                  >
                    <div className="text-sm leading-tight">{segment.text}</div>
                    {segment.subtext && (
                      <div className="text-xs opacity-90 mt-1">{segment.subtext}</div>
                    )}
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
        disabled={isSpinning || isLocked}
        className={`px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
          isLocked ? 'cursor-not-allowed' : ''
        }`}
      >
        {isLocked ? '🔒 LOCKED' : isSpinning ? '🎰 SPINNING...' : '🎯 SPIN NOW!'}
      </button>

      {/* Prize List */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 font-semibold mb-2">Win One of These Amazing Prizes:</p>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          {segments.map((seg, i) => (
            <span key={i} className="bg-gray-100 px-3 py-1 rounded-full">
              {seg.text} {seg.subtext}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
