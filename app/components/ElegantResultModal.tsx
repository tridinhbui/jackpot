'use client';

import { useEffect } from 'react';

interface ElegantResultModalProps {
  isOpen: boolean;
  reward: string;
  onClose: () => void;
}

const ElegantResultModal = ({ isOpen, reward, onClose }: ElegantResultModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white max-w-2xl w-full animate-scaleIn border border-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-all duration-300"
          aria-label="Close"
        >
          <span className="text-xl font-light">×</span>
        </button>

        {/* Content */}
        <div className="p-12 sm:p-16 text-center">
          {/* Title */}
          <div className="mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-black mb-6 tracking-tight">
              Congratulations
            </h2>
            <div className="elegant-divider mb-6"></div>
            <p className="text-sm uppercase tracking-widest text-gray-600 font-light">
              You have been awarded
            </p>
          </div>

          {/* Reward Display */}
          <div className="mb-12 py-12 border-y border-black">
            <div className="font-serif text-3xl sm:text-4xl font-semibold text-black tracking-tight leading-tight">
              {reward}
            </div>
          </div>

          {/* Spa Info */}
          <div className="mb-10 space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-black mb-2">Aventus Spa</h3>
              <p className="text-sm text-gray-600 tracking-wide">
                Premium Nail Salon Experience
              </p>
            </div>
            
            <div className="text-sm text-gray-700 leading-relaxed space-y-1">
              <p>94 Meadow Park Avenue</p>
              <p>Lewis Center, Ohio 43035</p>
            </div>

            <div className="pt-4">
              <a
                href="tel:614-618-9999"
                className="text-base font-medium text-black tracking-wide hover:text-gray-600 transition-colors inline-block border-b border-black"
              >
                614.618.9999
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={onClose}
              className="w-full py-4 px-8 bg-black text-white text-sm uppercase tracking-widest font-medium hover:bg-gray-900 transition-all duration-300"
            >
              Claim Your Reward
            </button>
            
            <a
              href="tel:614-618-9999"
              className="block w-full py-4 px-8 border border-black text-black text-sm uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              Call to Schedule
            </a>
          </div>

          {/* Terms */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 italic leading-relaxed">
              Valid for thirty days from date of award. Not combinable with other offers. 
              Please contact us to schedule your appointment and redeem your reward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantResultModal;

