'use client';

import { useState, useEffect } from 'react';
import ElegantRegistrationForm from './components/ElegantRegistrationForm';
import ElegantSpinWheel from './components/ElegantSpinWheel';
import ElegantResultModal from './components/ElegantResultModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const hasUserSpun = localStorage.getItem(`hasSpun_${user.phone}`);
        if (hasUserSpun === 'true') {
          setHasSpun(true);
          setIsRegistered(true);
          setUserData(user);
        }
      }
    }
  }, []);

  const handleRegistration = (data: { name: string; phone: string; email: string }) => {
    setUserData(data);
    setIsRegistered(true);
  };

  const handleSpinComplete = (reward: string) => {
    setCurrentReward(reward);
    setIsModalOpen(true);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(`hasSpun_${userData.phone}`, 'true');
      
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
    
    setHasSpun(true);
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {hasSpun ? (
          /* Already Participated */
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="mb-12">
              <div className="w-20 h-20 border-2 border-black rounded-full mx-auto mb-8 flex items-center justify-center">
                <div className="w-12 h-12 bg-black rounded-full"></div>
              </div>
              <h2 className="font-serif text-4xl font-semibold text-black mb-4 tracking-tight">
                Thank You
              </h2>
              <div className="elegant-divider mb-6"></div>
              <p className="text-gray-600 text-base tracking-wide mb-8">
                {userData.name}, you have already participated in this promotion.
              </p>
            </div>

            {currentReward && (
              <div className="mb-12 py-8 border-y border-black">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Your Award</p>
                <p className="font-serif text-2xl font-semibold text-black">{currentReward}</p>
              </div>
            )}

            <div className="space-y-4 text-sm text-gray-600">
              <p className="italic">Each entry is limited to one participation per phone number.</p>
              <p>Contact us at <span className="font-medium text-black">614.618.9999</span> to redeem your reward.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Message (after registration) */}
            {isRegistered && !hasSpun && (
              <div className="text-center mb-12 py-8 border-y border-gray-200">
                <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">Welcome</p>
                <p className="font-serif text-2xl font-semibold text-black">{userData.name}</p>
                <p className="text-xs text-gray-500 mt-2 tracking-wide">{userData.email}</p>
              </div>
            )}

            {/* Split Layout: Registration | Wheel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black min-h-[600px]">
              {/* Left Side - Registration Form */}
              <div className="relative border-b lg:border-b-0 lg:border-r border-black bg-white">
                {!isRegistered ? (
                  <ElegantRegistrationForm onSubmit={handleRegistration} />
                ) : (
                  <div className="h-full flex flex-col justify-center items-center px-8 lg:px-16 py-12">
                    <div className="text-center max-w-md">
                      <div className="w-16 h-16 border-2 border-black rounded-full mx-auto mb-6 flex items-center justify-center">
                        <div className="w-10 h-10 bg-black rounded-full"></div>
                      </div>
                      <h3 className="font-serif text-3xl font-semibold text-black mb-4">
                        Registration Complete
                      </h3>
                      <div className="elegant-divider mb-6"></div>
                      <p className="text-sm text-gray-600 tracking-wide leading-relaxed">
                        You are now eligible to participate. Please proceed to spin the wheel for your exclusive reward.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Spin Wheel */}
              <div className="relative bg-white">
                <ElegantSpinWheel 
                  onSpinComplete={handleSpinComplete}
                  isLocked={!isRegistered}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
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
