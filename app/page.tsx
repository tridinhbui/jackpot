'use client';

import { useState } from 'react';
import ElegantRegistrationForm from './components/ElegantRegistrationForm';
import ElegantSpinWheel from './components/ElegantSpinWheel';
import ElegantResultModal from './components/ElegantResultModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState('');
  const [userData, setUserData] = useState<{ name: string; phone: string; email: string } | null>(null);

  const handleRegistration = (data: { name: string; phone: string; email: string }) => {
    setUserData(data);
  };

  const handleSpinComplete = (reward: string) => {
    setCurrentReward(reward);
    setIsModalOpen(true);
    
    if (typeof window !== 'undefined' && userData) {
      const spinResult = {
        ...userData,
        reward,
        timestamp: new Date().toISOString(),
      };
      
      const history = localStorage.getItem('spinHistory');
      const historyList = history ? JSON.parse(history) : [];
      historyList.push(spinResult);
      localStorage.setItem('spinHistory', JSON.stringify(historyList));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-black tracking-tight mb-3">
              Aventus Spa
            </h1>
            <div className="elegant-divider mb-4"></div>
            <p className="text-sm uppercase tracking-widest text-gray-600 font-light">
              Exclusive Rewards Program
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Side by Side Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice Banner */}
        <div className="mb-8 p-6 border border-black bg-white text-center">
          <p className="text-sm text-black tracking-wide leading-relaxed">
            <span className="font-semibold">Important Notice:</span> Each phone number is eligible for{' '}
            <span className="font-semibold">one prize confirmation only</span>. You may participate multiple times, 
            but only your first spin result with each phone number will be valid for redemption.
          </p>
        </div>

        {/* Split Layout: Form | Wheel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black min-h-[700px]">
          {/* Left Side - Registration Form */}
          <div className="relative border-b lg:border-b-0 lg:border-r border-black bg-white">
            <ElegantRegistrationForm onSubmit={handleRegistration} />
          </div>

          {/* Right Side - Spin Wheel */}
          <div className="relative bg-white">
            <ElegantSpinWheel 
              onSpinComplete={handleSpinComplete}
              userData={userData}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-8 p-6 border-t border-gray-200">
          <h3 className="text-xs uppercase tracking-widest text-gray-900 font-medium mb-3">
            Terms & Conditions
          </h3>
          <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
            <li>• Each phone number is limited to one valid prize confirmation</li>
            <li>• Prizes are valid for 30 days from the date of winning</li>
            <li>• Must present valid identification when redeeming prize</li>
            <li>• Prizes cannot be combined with other offers or promotions</li>
            <li>• Contact us at 614.618.9999 to schedule your appointment</li>
            <li>• Management reserves the right to verify eligibility</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-black mb-2">Aventus Spa</h3>
              <p className="text-sm text-gray-600 tracking-wide">Premium Nail Salon</p>
            </div>
            
            <div className="text-sm text-gray-700 space-y-1">
              <p>94 Meadow Park Avenue, Lewis Center, Ohio 43035</p>
              <p>Next to Bath & Body Works</p>
            </div>

            <div className="pt-4">
              <a
                href="tel:614-618-9999"
                className="text-base font-medium text-black tracking-wide hover:text-gray-600 transition-colors inline-block border-b border-black"
              >
                614.618.9999
              </a>
            </div>

            <div className="pt-8">
              <p className="text-xs text-gray-400 tracking-wide">
                © 2025 Aventus Spa. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Result Modal */}
      <ElegantResultModal 
        isOpen={isModalOpen}
        reward={currentReward}
        onClose={handleCloseModal}
      />
    </div>
  );
}
