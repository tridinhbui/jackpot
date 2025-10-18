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
      // Trigger confetti animation
      const duration = 4000;
      const end = Date.now() + duration;

      const colors = ['#9333ea', '#ec4899', '#ef4444', '#f59e0b', '#10b981'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Big burst in center
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getPrizeIcon = (reward: string) => {
    if (reward.includes('Gel Polish')) return '💅';
    if (reward.includes('Hydration')) return '💧';
    if (reward.includes('Gift Card')) return '🎁';
    if (reward.includes('Nail Design')) return '✨';
    if (reward.includes('Elite')) return '👑';
    if (reward.includes('25%')) return '🎉';
    return '🎊';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-12 animate-scaleIn border-4 border-purple-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all border-2 border-gray-200"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6 text-gray-600"
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
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 flex items-center justify-center shadow-2xl animate-bounce">
              <span className="text-5xl">{getPrizeIcon(reward)}</span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              🎊 CONGRATULATIONS! 🎊
            </h2>
            <p className="text-lg text-gray-600">
              You just won an amazing prize!
            </p>
          </div>

          {/* Reward Card */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 shadow-2xl transform hover:scale-105 transition-all">
            {/* Glossy reflection effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Reward Content */}
            <div className="relative">
              <div className="text-5xl sm:text-6xl font-bold text-white mb-3 drop-shadow-lg">
                {reward}
              </div>
              <div className="text-lg text-white/90 font-semibold">
                Complimentary Service
              </div>
            </div>

            {/* Sparkle effects */}
            <div className="absolute top-2 right-2 text-2xl animate-pulse">✨</div>
            <div className="absolute bottom-2 left-2 text-2xl animate-pulse delay-100">✨</div>
            
            {/* Bottom reflection shine */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent rounded-b-2xl pointer-events-none" />
          </div>

          {/* Spa Info */}
          <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <p className="text-purple-900 font-bold text-lg mb-2">
              🌟 Valid at Aventus Spa
            </p>
            <p className="text-gray-700 mb-3">
              94 Meadow Park Ave - Lewis Center, OH 43035
            </p>
            <a
              href="tel:614-618-9999"
              className="inline-block text-purple-700 font-bold hover:underline text-lg"
            >
              📞 Call to Redeem: 614-618-9999
            </a>
          </div>

          {/* Redeem Button */}
          <button
            onClick={onClose}
            className="w-full py-5 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
          >
            🎁 Claim Your Prize Now!
          </button>

          {/* Small print */}
          <p className="text-gray-500 text-xs">
            Terms and conditions apply. Valid for 30 days from win date.<br />
            Call us to schedule your appointment and redeem your prize!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
