'use client';

import { useState, useEffect } from 'react';
import BookingSection from './components/BookingSection';
import SpinRegistrationForm from './components/SpinRegistrationForm';
import SpinWheel from './components/SpinWheel';
import ResultModal from './components/ResultModal';

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
    // Check if user has already spun
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
    
    // Mark as spun
    if (typeof window !== 'undefined') {
      localStorage.setItem(`hasSpun_${userData.phone}`, 'true');
      
      // Save spin result
      const spinResult = {
        ...userData,
        reward,
        timestamp: new Date().toISOString(),
      };
      
      // Save to spin history
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3">
            Aventus Spa
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-semibold">Premium Nail Salon Experience</p>
          <p className="text-gray-600 mt-2">94 Meadow Park Ave - Lewis Center, OH 43035</p>
        </div>

        {/* Booking Section */}
        <BookingSection />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-3 text-2xl font-bold text-gray-800 rounded-full shadow-lg">
              🎰 SPIN TO WIN SPECIAL OFFERS! 🎁
            </span>
          </div>
        </div>

        {/* Spin Section */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
          {hasSpun ? (
            <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-3xl shadow-xl">
              <div className="mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-5xl">🎉</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Thank You, {userData.name}!
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  You&apos;ve already used your spin.
                </p>
                {currentReward && (
                  <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 mb-6 shadow-xl">
                    <p className="text-white text-sm mb-2 font-semibold">YOUR PRIZE</p>
                    <p className="text-white text-4xl font-bold">{currentReward}</p>
                  </div>
                )}
                <p className="text-gray-500 text-sm mb-6">
                  Each phone number is limited to one spin only.
                </p>
                <a
                  href="tel:614-618-9999"
                  className="inline-block px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
                >
                  📞 Call Us to Redeem: 614-618-9999
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* User Info Display (after registration) */}
              {isRegistered && !hasSpun && (
                <div className="text-center mb-8">
                  <div className="inline-block bg-white rounded-2xl shadow-xl px-8 py-4 border-2 border-purple-200">
                    <p className="text-gray-700 font-bold text-lg">
                      Welcome, <span className="text-purple-600">{userData.name}</span>! 🎉
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {userData.phone} • {userData.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Form + Wheel Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Registration Form */}
                {!isRegistered ? (
                  <SpinRegistrationForm onSubmit={handleRegistration} />
                ) : (
                  <div className="bg-white rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-center items-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-4xl">✅</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        You&apos;re Ready!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Click the spin button to win your prize
                      </p>
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200">
                        <p className="text-sm text-purple-800 font-semibold">
                          🎁 One of 6 amazing prizes awaits you!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spin Wheel */}
                <div className="relative">
                  <SpinWheel 
                    onSpinComplete={handleSpinComplete}
                    isLocked={!isRegistered}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Result Modal */}
        <ResultModal 
          isOpen={isModalOpen}
          reward={currentReward}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
