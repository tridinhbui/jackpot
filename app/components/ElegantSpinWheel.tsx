'use client';

import { useState, useEffect } from 'react';

interface ElegantSpinWheelProps {
  onSpinComplete: (reward: string) => void;
  userData: { name: string; phone: string; email: string } | null;
}

const ElegantSpinWheel = ({ onSpinComplete, userData }: ElegantSpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpunBefore, setHasSpunBefore] = useState(false);

  const segments = [
    { text: 'Gel Polish Add-On', value: '$20 Value', color: 'black' },
    { text: 'Hydration Package', value: '$15 Value', color: 'white' },
    { text: '$10 Gift Card', value: 'Off Purchase', color: 'black' },
    { text: 'Nail Design', value: 'Up to $15', color: 'white' },
    { text: 'Elite Package', value: '$25 Value', color: 'black' },
    { text: '25% Discount', value: 'Total Bill', color: 'white' },
  ];

  const segmentAngle = 360 / segments.length;

  useEffect(() => {
    // Check if this phone has spun before
    if (userData?.phone && typeof window !== 'undefined') {
      const hasSpun = localStorage.getItem(`hasSpun_${userData.phone}`);
      setHasSpunBefore(hasSpun === 'true');
    }
  }, [userData]);

  const handleSpin = () => {
    if (isSpinning || !userData) return;

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
      
      // Mark as spun for this phone
      if (typeof window !== 'undefined') {
        localStorage.setItem(`hasSpun_${userData.phone}`, 'true');
        setHasSpunBefore(true);
      }
      
      onSpinComplete(`${segments[segmentIndex].text} (${segments[segmentIndex].value})`);
    }, 4500);
  };

  const canSpin = userData !== null;

  return (
    <div className="h-full flex flex-col justify-center items-center px-8 lg:px-16 py-12">
      <div className="max-w-xl mx-auto w-full text-center">
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-black mb-4 tracking-tight">
            Spin for Your Reward
          </h2>
          <div className="elegant-divider mb-5"></div>
          {userData ? (
            <div className="space-y-2">
              <p className="text-sm text-black font-medium">
                Welcome, {userData.name}
              </p>
              <p className="text-xs text-gray-500 tracking-wide">
                {userData.phone}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 text-sm tracking-wide">
              Please complete the form to participate
            </p>
          )}
        </div>

        {/* Warning if already spun */}
        {hasSpunBefore && (
          <div className="mb-6 p-4 border border-gray-300 bg-gray-50">
            <p className="text-xs text-gray-700 tracking-wide leading-relaxed">
              Note: This phone number has already participated. You may spin again, 
              but only your first result is eligible for prize redemption.
            </p>
          </div>
        )}

        {/* Wheel Container */}
        <div className="relative mb-10">
          {/* Pointer */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-black" />
          </div>

          {/* Wheel */}
          <div 
            className={`relative w-80 h-80 lg:w-96 lg:h-96 rounded-full border-4 border-black ${
              !canSpin ? 'opacity-30' : ''
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
          disabled={isSpinning || !canSpin}
          className={`px-12 py-4 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-gray-900 transition-all duration-300 border border-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black`}
        >
          {!canSpin ? 'Complete Form First' : isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </button>

        {/* Prize List */}
        <div className="mt-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Available Rewards</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            {segments.map((seg, i) => (
              <div key={i} className="border-b border-gray-200 pb-2">
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
