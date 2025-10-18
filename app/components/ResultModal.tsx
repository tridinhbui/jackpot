'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ResultModalProps {
  isOpen: boolean;
  reward: string;
  onClose: () => void;
}

const ResultModal = ({ isOpen, reward, onClose }: ResultModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation with black/white theme
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#000000', '#ffffff', '#404040', '#808080'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center shadow-lg">
              <span className="text-4xl">🎉</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            You just hit the jackpot!
          </h2>

          {/* Reward Card */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl">
            {/* Glossy reflection effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Reward Amount */}
            <div className="relative">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                {reward}
              </div>
              <div className="text-sm sm:text-base text-white/80 font-medium">
                Coupon bundle
              </div>
            </div>

            {/* Bottom reflection shine */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent rounded-b-2xl pointer-events-none" />
          </div>

          {/* Aventus Spa Info */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-900 font-semibold text-sm sm:text-base">
              Valid at Aventus Spa
            </p>
            <p className="text-gray-700 text-xs sm:text-sm">
              Premium nail care services
            </p>
          </div>

          {/* Get It Button */}
          <button
            onClick={onClose}
            className="w-full py-4 px-6 bg-black text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 hover:bg-gray-900"
          >
            Get it now
          </button>

          {/* Small print */}
          <p className="text-gray-500 text-xs">
            Terms and conditions apply. Valid for 30 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
